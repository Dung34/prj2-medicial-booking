import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const [showNotification, setShowNotification] = useState(false);
    const [fullname, setFullname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [identificationNumber, setIdentificationNumber] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
            setError('');

        }, 3000);
        try {
            if (password !== confirmPassword) {
                setError('Mật khẩu không khớp');
            } else {
                const response = await axios.post('http://localhost:3000/api/patient/register', {
                    fullname,
                    phoneNumber,
                    email,
                    password,
                    address,
                    dateOfBirth,
                    gender,
                    identificationNumber,
                    bloodType,
                })
                if (response.status === 200) {
                    setError('Đăng ký thành công');
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                }


            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message);
            } else {
                setError('Đã xảy ra lỗi, vui lòng thử lại sau');
            }
        }
    }
    return (
        <div className="relative flex flex-col items-center justify-center h-screen">
            {/* Form */}
            <form className="border border-gray-300 p-8 rounded-lg z-10 shadow-md w-[1000px] " onSubmit={handleSubmit} >
                <h2 className="text-2xl font-semibold mb-4">Đăng ký tài khoản</h2>
                <div className='grid grid-cols-2 gap-4'>
                    <input
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        placeholder="Họ và tên"
                        className="border border-gray-300 p-2 rounded mb-1 w-full"
                    />
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Số điện thoại"
                        className="border border-gray-300 p-2 rounded mb-1 w-full"
                    />
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="border border-gray-300 p-2 rounded mb-1 w-full"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mật khẩu"
                        className="border border-gray-300 p-2 rounded mb-1 w-full"
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Nhập lại mật khẩu"
                        className="border border-gray-300 p-2 rounded mb-1 w-full"
                    />
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Địa chỉ"
                        className="border border-gray-300 p-2 rounded mb-1 w-full"
                    />
                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        placeholder="Ngày sinh"
                        className="border border-gray-300 p-2 rounded mb-1 w-full"
                    />
                    <div className='mb-1 p-2 flex flex-row gap-2'>
                        <label className='mr-4'>Giới tính</label>
                        <input type="radio" name='gender' value="Nam" onChange={(e) => setGender(e.target.value)} /> Nam
                        <input type="radio" name='gender' value="Nữ" onChange={(e) => setGender(e.target.value)} /> Nữ
                    </div>
                    <input
                        type="text"
                        value={identificationNumber}
                        onChange={(e) => setIdentificationNumber(e.target.value)}
                        placeholder="Số CMND"
                        className="border border-gray-300 p-2 rounded mb-1 w-full" />
                    <input
                        type="text"
                        value={bloodType}
                        onChange={(e) => setBloodType(e.target.value)}
                        placeholder="Nhóm máu"
                        className="border border-gray-300 p-2 rounded mb-1 w-full" />
                </div>

                <button
                    type='submit'

                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>

            {/* Notification */}
            {showNotification && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 p-8 rounded-lg z-20 bg-amber-50">
                    <h2 className="text-2xl font-semibold mb-4">Thông báo</h2>
                    <p>{error}</p>
                </div>
            )}



        </div>
    )
}

export default RegisterPage
