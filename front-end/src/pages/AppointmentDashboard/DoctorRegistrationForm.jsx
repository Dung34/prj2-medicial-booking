import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CiUser, CiPhone, CiMail, CiMap, CiLock } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { IoKeyOutline } from "react-icons/io5";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DoctorRegistrationForm = () => {
    const [specialities, setSpecialities] = useState([])
    const [selectedId, setSelectId] = useState('')
    const [error, setError] = useState('')
    const apiUrl = import.meta.env.VITE_API_URL
    const [fullname, setFullname] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [success, setSuccess] = useState(false);
    const { registerUser } = useAuth();
    const navigate = useNavigate();
    const handleSelect = (e) => {
        setSelectId('')
        setSelectId(e.target.value)
    }
    const isMatch = password && confirmPassword && password === confirmPassword

    useEffect(() => {
        const getSpecialities = async () => {
            try {
                const response = await axios.get(`${apiUrl}/speciality`)
                if (response.status == 200) {
                    setSpecialities(response.data)
                }
                else {
                    setError("Không tìm thấy chuyên khoa nào")
                }
            } catch (error) {
                setError("Không thể tải chuyên khoa")
            }
        }
        getSpecialities()
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('');
        if (!isMatch) {
            setError("Mật khẩu không trùng khớp")
            return
        }
        try {
            // 1. Register doctor account using AuthContext
            const result = await axios.post(`${apiUrl}/login/signIn`, {
                email,
                password,
                role: 'doctor',
            });
            if (result.status !== 200) {
                setError(result.data.message);
                return;
            }
            const userId = result.data.data._id;

            // 2. Register doctor profile
            const profileRes = await axios.post(`${apiUrl}/api/doctor/register`, {
                fullname,
                phoneNumber,
                email,
                address,
                speciality_id: selectedId,
                userId,
                isVerified: true
            });
            if (profileRes.status === 200) {
                setSuccess(true);
                setFullname('');
                setPhoneNumber('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setAddress('');
                setSelectId('');
                setTimeout(() => {
                    setSuccess(false);
                    navigate('/dashboard');
                }, 1500);
            } else {
                setError(profileRes.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Đăng ký thất bại!");
        }
    }
    return (
        <div className=''>
            <div className='w-1/3 mx-auto border border-gray-400 rounded-2xl p-4 my-[5vh]'>
                <h3 className='font-sans font-bold text-3xl'>Đăng ký bác sĩ (Chỉ dành cho Admin)</h3>
                {error && (
                    <div className="bg-red-100 text-red-700 p-2 rounded mb-2 text-center">{error}</div>
                )}
                {success && (
                    <div className="bg-green-100 text-green-700 p-2 rounded mb-2 text-center">Đăng ký thành công!</div>
                )}
                <form action="sumbit" onSubmit={handleSubmit}>
                    <div>
                        <p className='font-sans font-medium text-xl mt-3 mb-2'>Họ và tên</p>
                        <div className='flex flex-row gap-3 items-center'>
                            <CiUser className='size-6' />
                            <input className='border border-gray-300 rounded-md bg-white w-full px-2 py-2'
                                placeholder='Nguyễn Việt Hải'
                                type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 mt-3 gap-4'>
                        <div>
                            <p className='font-sans font-medium text-xl mb-2'>Số điện thoại</p>
                            <div className='flex flex-row gap-3 items-center'>
                                <CiPhone className='size-6' />
                                <input className='border border-gray-300 rounded-md bg-white w-full px-2 py-2'
                                    placeholder='+84 123 456 789'
                                    type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                                    name="phoneNumber" id="phoneNumber" />
                            </div>
                        </div>
                        <div >
                            <p className='font-sans font-medium text-xl mb-2'>Email</p>
                            <div className='flex flex-row gap-3 items-center'>
                                <CiMail className='size-6' />
                                <input className='border border-gray-300 rounded-md bg-white w-full px-2 py-2'
                                    placeholder='dung.nv120234@hust.edu.vn'
                                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                    name='email' id='email' />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className='font-sans font-medium text-xl mt-3 mb-2'>Địa chỉ</p>
                        <div className='flex flex-row gap-3 items-center'>
                            <CiMap className='size-6' />
                            <input className='border border-gray-300 rounded-md bg-white w-full px-2 py-2'
                                placeholder='Số 5a8 Khu tập thể 123, Phường Phúc Đồng, Long Biên, Hà Nội'
                                type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                                name='address' id='address' />
                        </div>
                    </div>
                    <div>
                        <p className='font-sans font-medium text-xl mt-3 mb-2'>Chuyên ngành</p>
                        <select className="font-sans text-[16px] w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-black"
                            name="speciality" id="speciality" value={selectedId} onChange={handleSelect}>
                            <option value="" disabled>--- Chọn chuyên ngành ---</option>
                            {specialities.map((speciality) => (
                                <option className='font-sans text-[16px] text-black'
                                    key={speciality._id} value={speciality._id}>{speciality.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className='grid grid-cols-2 mt-3 gap-4'>
                        <div>
                            <p className='font-sans font-medium text-xl mb-2'>Mật khẩu</p>
                            <div className='flex flex-row gap-3 items-center'>
                                <CiLock className='size-6' />
                                <input className='border border-gray-300 rounded-md bg-white w-full px-2 py-2'
                                    type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                    name="password" id="password" />
                            </div>
                        </div>
                        <div >
                            <p className='font-sans font-medium text-xl mb-2'>Nhập lại mật khẩu</p>
                            <div className='flex flex-row gap-3 items-center'>
                                {confirmPassword ? (
                                    isMatch ? (<FaCheck className='size-4 text-green-400' />) : (<RxCross2 className='size-4 text-red-600' />)
                                ) : (<IoKeyOutline className='size-4' />)}

                                <input className='border border-gray-300 rounded-md bg-white w-full px-2 py-2'
                                    placeholder=''
                                    type="password" value={confirmPassword} onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    name='confirm' id='confirm' />
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type='submit' className='w-full bg-green-800 font-sans font-medium text-[16px] text-white py-2 my-3 rounded-md'>Đăng ký</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DoctorRegistrationForm
