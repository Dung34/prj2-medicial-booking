import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import logo from '../../assets/Icons/medicine.png'
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, error, registerUser, isLoading, isAuthenticated } = useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('patient')
    const [notification, setNotification] = useState('')
    const [showNotification, setShowNotification] = useState(false)

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/')
        }
    }, [isAuthenticated, navigate])

    const handleSignIn = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setNotification('Mật khẩu chưa trùng nhau !!!')
            setShowNotification(true)
            setPassword('')
            setConfirmPassword('')
            return
        }

        const result = await registerUser(email, password, role)
        if (result.success) {
            setNotification(result.message)
            setShowNotification(true)
            setTimeout(() => {
                if (role === 'doctor') {
                    navigate('/register-doctor', { state: { email } })
                } else {
                    navigate('/register')
                }
            }, 1500)
        } else {
            setNotification(result.message)
            setShowNotification(true)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password, role)
        if (result.success) {
            setNotification(result.message)
            setShowNotification(true)
            setTimeout(() => {
                if (role === 'admin') {
                    navigate('/dashboard')
                } else {
                    navigate('/')
                }
            }, 1500)
        } else {
            setNotification(result.message)
            setShowNotification(true)
        }
    };

    // Auto-hide notification after 5 seconds
    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false)
                setNotification('')
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [showNotification])

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg mt-10 border border-gray-100">
            <div className="flex flex-col items-center">
                <div className="flex items-center mb-4">
                    <img
                        src={logo}
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

                {/* Notification */}
                {showNotification && (
                    <div className={`w-full p-3 rounded-md mb-4 text-center ${notification.includes('thành công') || notification.includes('success')
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-red-100 text-red-700 border border-red-300'
                        }`}>
                        {notification}
                    </div>
                )}

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
                                    disabled={isLoading}
                                />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Nhập mật khẩu"
                                    className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    disabled={isLoading}
                                />
                                {/* Role selection for login */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Chọn vai trò:
                                    </label>
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        disabled={isLoading}
                                    >
                                        <option value="patient">Bệnh nhân</option>
                                        <option value="doctor">Bác sĩ</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className="w-full bg-[#d5af7e] text-white rounded-md py-2 hover:bg-[#ffd196] transition disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isLoading ? 'Đang xử lý...' : 'Đăng nhập ngay'}
                                </button>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Nhập email"
                                    className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    disabled={isLoading}
                                />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Nhập mật khẩu"
                                    className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    disabled={isLoading}
                                />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Nhập lại mật khẩu"
                                    className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    disabled={isLoading}
                                />

                                {/* Role selection */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Chọn vai trò:
                                    </label>
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        disabled={isLoading}
                                    >
                                        <option value="patient">Bệnh nhân</option>
                                        <option value="doctor">Bác sĩ</option>
                                    </select>
                                </div>

                                <button
                                    onClick={handleSignIn}
                                    disabled={isLoading}
                                    className="w-full bg-[#d5af7e] text-white rounded-md py-2 hover:bg-[#ffd196] transition disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isLoading ? 'Đang xử lý...' : 'Đăng ký tài khoản'}
                                </button>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
        </div>
    )
}

export default LoginPage
