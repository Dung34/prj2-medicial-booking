import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoMailOpenOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import ZaloIcon from '../../assets/Icons/zaloIcon.png'
import logo from '../../assets/Icons/medicine.png'
const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLoginbyFb = async () => {
        setError('Chức năng này chưa khả dụng')

        setShowNotification(true)
        setTimeout(() => {
            setError('')
        }, 3000)
    }
    const [showNotification, setShowNotification] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // Handle login logic here (e.g., API call)
        try {
            const response = await axios.post('http://localhost:3000/login', {
                email,
                password
            });
            console.log("id: ", response.data.id);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('id', response.data.id);
            setError("Đăng nhập thành công")
            setShowNotification(true)

            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            console.error('Error:', error);
            setError('Không thể đăng nhập, vui lòng kiểm tra lại thông tin tài khoản của bạn!');
            setShowNotification(true)
            setTimeout(() => {
                setShowNotification(false)
            }, 3000)
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg mt-10 border border-gray-100">
            <div className="flex flex-col items-center">
                <div className="flex items-center mb-4">
                    <img
                        src={logo} // Replace with your logo path
                        alt="XtraClinic Logo"
                        className="h-10 w-auto"
                    />
                    <span className="font-semibold text-2xl">XtraClinic</span>
                </div>
                <h2 className="text-2xl font-bold text-center mb-2">
                    Đăng nhập
                </h2>
                <p className="text-gray-600 text-center mb-6">
                    Nơi sức khỏe bắt đầu bằng sự quan tâm.
                </p>

                <div className="flex gap-4 w-full mb-4">
                    <button onClick={handleLoginbyFb} className="flex justify-center items-center px-4 gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50">

                        <FcGoogle className='size-4' />
                        Google
                    </button>
                    <button onClick={handleLoginbyFb} className="flex justify-center items-center px-4 gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50">
                        <img src={ZaloIcon} alt="" className='size-4' />
                        Zalo
                    </button>

                    <button onClick={handleLoginbyFb} className="flex justify-center items-center px-4 gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50">
                        <FaFacebook className='size-4 text-[#0866ff]' />
                        Facebook
                    </button>
                </div>

                <div className="w-full text-center text-gray-400 mb-4">
                    <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-400">
                                Hoặc
                            </span>
                        </div>
                    </div>
                </div>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email"
                    className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button onClick={handleSubmit}
                    className="w-full bg-purple-600 text-white rounded-md py-2 hover:bg-purple-700 transition">
                    Đăng nhập ngay
                </button>
                {error && showNotification && (
                    <div className="mt-4 text-red-500 text-center">
                        {error}
                    </div>
                )}
                <p className="text-xs text-gray-500 mt-4 text-center">
                    Chưa có tài khoản ? Đăng ký {" "}
                    <a href="#" className="text-blue-600 underline">
                        tại đây
                    </a>{" "}
                    hoặc liên hệ với chúng tôi qua email {""}
                    .
                </p>
                <p className="text-xs text-gray-400 mt-1 text-center">
                    Dung.nv210227@hust.edu.vn
                </p>
            </div>
        </div>
    )
}

export default LoginPage
