import React, { useState, useRef, useEffect } from 'react'
import logo from '../../assets/Icons/medicine.png'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
    const navigate = useNavigate()
    const { user, logout, patient, doctor, isAuthenticated } = useAuth()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    const isLoggedIn = isAuthenticated()

    return (
        <header className=''>
            {/* Emergency Call Section */}
            <div className='flex justify-center'>
                <div className="bg-teal-400 text-white text-center py-2 w-[60%] rounded-b-[35px]">
                    <p>For Emergency call +1(800) 345 678</p>
                </div>
            </div>

            {/* Main Header Section */}
            <div className="flex items-center justify-between p-4">
                {/* Logo */}
                <div className="flex items-center">
                    <img
                        src={logo}
                        alt="XtraClinic Logo"
                        className="h-10 w-auto ml-[30px]"
                    />
                    <span className="font-semibold text-2xl">XtraClinic</span>
                </div>

                {/* Navigation Links */}
                <nav className="flex items-center space-x-4">
                    <Link to="/" className="text-gray-700 hover:text-blue-500">
                        <span>Trang chủ</span>
                    </Link>
                    <Link to="/doctors/all" className="text-gray-700 hover:text-blue-500">
                        <span>Bác sĩ</span>
                    </Link>
                    <Link to="/" className="text-gray-700 hover:text-blue-500">
                        <span>Dịch vụ</span>
                    </Link>
                    <Link to="/" className="text-gray-700 hover:text-blue-500">
                        <span>Blog</span>
                    </Link>
                    <Link to="/" className="text-gray-700 hover:text-blue-500">
                        <span>Liên hệ</span>
                    </Link>

                    {/* User Menu */}
                    {isLoggedIn ? (
                        <div className="flex items-center space-x-4">
                            {/* User Info with Dropdown */}
                            <div className="relative flex items-center space-x-2" ref={dropdownRef}>
                                <button
                                    className="text-sm text-gray-600 focus:outline-none flex items-center"
                                    onClick={() => setDropdownOpen((prev) => !prev)}
                                >
                                    Xin chào, {user.name || user.email}
                                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                                {user.role === 'patient' && patient && (
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                        {patient.name}
                                    </span>
                                )}
                                {user.role === 'doctor' && doctor && (
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                        {doctor.fullname}
                                    </span>
                                )}
                                {/* Dropdown Menu */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                                        <Link
                                            to="/my-appointments"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Lịch hẹn của tôi
                                        </Link>
                                        <Link
                                            to="/my-emr"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Bệnh án của tôi
                                        </Link>
                                        <Link
                                            to="/edit-patient-info"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Chỉnh sửa thông tin
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Dashboard Link */}
                            {user.role === 'doctor' && (
                                <Link
                                    to="/doctor-dashboard"
                                    className="bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700"
                                >
                                    Dashboard
                                </Link>
                            )}

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-red-700 transition-colors"
                            >
                                <span>Đăng xuất</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-blue-800 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-blue-900 transition-colors"
                        >
                            <span>Đăng nhập</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar

