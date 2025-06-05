import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import logo from '../../assets/Icons/medicine.png'
import { useAuth } from '../../context/AuthContext';
const LoginPage = () => {
    const navigate = useNavigate();
    const { login, error } = useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    const [notification, setNotification] = useState('')
    const [role, setRole] = useState('patient')
    const apiUrl = import.meta.env.VITE_API_URL

    const [showNotification, setShowNotification] = useState(false)

    const handleSignIn = async (e) => {
        e.preventDefault()

        try {
            if (password != confirmPassword) {
                alert('Mật khẩu chưa trùng nhau !!!')
                setShowNotification(true)
                setTimeout(() => {

                    setShowNotification(false)
                    setPassword('')
                    setConfirmPassword('')
                }, 5000)
            }
            const response = await axios.post(`${apiUrl}/login/signIn`, {
                "email": email,
                "password": password,
                "role": "patient"
            })

            if (response.status == 200) {

                setNotification(true)
                alert(response.data.message)
                navigate('/register')
            } else {
                if (response.status == 201) {
                    alert(response.data.message)
                }
            }


        } catch (err) {
            alert("Đăng ký thất bại hãy thử lại !")
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Handle login logic here (e.g., API call)
        try {
            await login(email, password)
            if (error) {
                alert(error)
            } else {
                alert("Dang nhap thanh cong")

                setTimeout(() => { navigate('/') })
            }

        } catch (err) {
            console.error('Error:', err);
            alert("Có lỗi không thể đăng nhập !!!")
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
                <TabGroup>
                    <TabList className='grid grid-cols-2 mb-2 rounded-lg'>
                        <Tab className='bg-gray-200 px-2 py-2'>Đăng nhập</Tab>
                        <Tab className='bg-gray-200 px-2 py-2'>Đăng ký </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <div>
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
                                    className="w-full bg-[#d5af7e] text-white rounded-md py-2 hover:bg-[#ffd196] transition">
                                    Đăng nhập ngay
                                </button>

                                {error && showNotification && (
                                    <div className="mt-4 text-red-500 text-center">
                                        {error}
                                    </div>
                                )}</div>
                        </TabPanel>
                        <TabPanel>
                            <div>
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
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Nhập lại mật khẩu"
                                    className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <button onClick={handleSignIn}
                                    className="w-full bg-[#d5af7e] text-white rounded-md py-2 hover:bg-[#ffd196] transition">
                                    Đăng ký tài khoản
                                </button>

                                {error && showNotification && (
                                    <div className="bg-red-500 text-white font-mono text-[16px] p-2 rounded-md">
                                        {error}
                                    </div>
                                )}</div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>




            </div>
        </div>
    )
}

export default LoginPage
