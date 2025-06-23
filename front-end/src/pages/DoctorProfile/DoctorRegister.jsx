import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { CiUser, CiMail, CiPhone, CiMap, CiLock } from 'react-icons/ci';
import { useAuth } from '../../context/AuthContext';

const DoctorRegister = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const location = useLocation();
    const [specialities, setSpecialities] = useState([]);
    const [fullname, setFullname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [address, setAddress] = useState('');
    const [specialityId, setSpecialityId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();
    const [email, setEmail] = useState(user.email);
    useEffect(() => {
        const getSpecialities = async () => {
            try {
                const response = await axios.get(`${apiUrl}/speciality`);
                if (response.status === 200) {
                    setSpecialities(response.data);
                }
            } catch (err) {
                setError('Không thể tải danh sách chuyên khoa.');
            }
        };
        getSpecialities();
    }, [apiUrl]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        // if (password !== confirmPassword) {
        //     setError('Mật khẩu không trùng khớp.');
        //     return;
        // }
        setLoading(true);
        try {
            // 1. Register account


            const userId = user._id;
            // 2. Register doctor profile
            const profileRes = await axios.post(`${apiUrl}/api/doctor/register`, {
                fullname,
                phoneNumber,
                email,
                address,
                speciality_id: specialityId,
                userId,
            });
            if (profileRes.status === 200) {
                setSuccess(true);
                setTimeout(() => navigate('/'), 2000);
            } else {

                setError(profileRes.data.message);

            }
        } catch (err) {
            setError(err.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4 text-center">Đăng ký tài khoản bác sĩ</h2>
                {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-2 text-center">{error}</div>}
                {success && <div className="bg-green-100 text-green-700 p-2 rounded mb-2 text-center">Đăng ký thành công! Chuyển hướng đến trang chủ...</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">Họ và tên</label>
                            <div className="flex items-center gap-2">
                                <CiUser className="size-5" />
                                <input type="text" className="w-full border rounded px-2 py-1" value={fullname} onChange={e => setFullname(e.target.value)} required />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1">Số điện thoại</label>
                            <div className="flex items-center gap-2">
                                <CiPhone className="size-5" />
                                <input type="text" className="w-full border rounded px-2 py-1" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">Email</label>
                            <div className="flex items-center gap-2">
                                <CiMail className="size-5" />
                                <input type="email" className="w-full border rounded px-2 py-1" value={email} onChange={e => setEmail(e.target.value)} required readOnly={!!location.state?.email} />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1">Địa chỉ</label>
                            <div className="flex items-center gap-2">
                                <CiMap className="size-5" />
                                <input type="text" className="w-full border rounded px-2 py-1" value={address} onChange={e => setAddress(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block mb-1">Chuyên khoa</label>
                        <select className="w-full border rounded px-2 py-1" value={specialityId} onChange={e => setSpecialityId(e.target.value)} required>
                            <option value="" disabled>--- Chọn chuyên khoa ---</option>
                            {specialities.map(s => (
                                <option key={s._id} value={s._id}>{s.title}</option>
                            ))}
                        </select>
                    </div>
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">Mật khẩu</label>
                            <div className="flex items-center gap-2">
                                <CiLock className="size-5" />
                                <input type="password" className="w-full border rounded px-2 py-1" value={password} onChange={e => setPassword(e.target.value)} required />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1">Nhập lại mật khẩu</label>
                            <div className="flex items-center gap-2">
                                <CiLock className="size-5" />
                                <input type="password" className="w-full border rounded px-2 py-1" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                            </div>
                        </div>
                    </div> */}
                    <button type="submit" className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition" disabled={loading}>
                        {loading ? 'Đang xử lý...' : 'Đăng ký'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DoctorRegister; 