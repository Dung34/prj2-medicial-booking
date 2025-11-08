import React, { useState, useRef, useEffect } from 'react'
import logo from '../../assets/Icons/medicine.png'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { HiMenu } from "react-icons/hi";

const Navbar = () => {
    const navigate = useNavigate()
    const { user, logout, patient, doctor, isAuthenticated } = useAuth()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
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
        <>
            <nav className='flex flex-col shadow-md'>
                {/* Emergency Call Section */}
                <div className='w-full'>
                    <div className="bg-teal-400 text-white text-center py-2">
                        <p className='text-sm'>For Emergency call +1(800) 345 678</p>
                    </div>
                </div>

                {/* Main Header Section */}
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <div className='flex flex-row gap-3'>
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className='text-gray700 text-2xl lg:hidden'>
                            <HiMenu />
                        </button>
                        <Link to="/">
                            <div className='flex flex-row items-center gap-1'>
                                <img src={logo} alt="XTRACLINIC" className='size-8' />
                                <p className='text-sm font-bold'>XTRACLINIC</p>
                            </div>
                        </Link>
                    </div>
                    <ul className="hidden lg:flex items-center space-x-6">
                        <li><a href="/trang-chu" className="text-gray-600 hover:text-blue-600">Trang chủ</a></li>
                        <li><a href="/dich-vu" className="text-gray-600 hover:text-blue-600">Dịch vụ</a></li>
                        <li><a href="/dat-lich" className="text-gray-600 hover:text-blue-600">Đặt lịch</a></li>
                        <li><a href="/lien-he" className="text-gray-600 hover:text-blue-600">Liên hệ</a></li>
                    </ul>
                    <button className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-full flex items-center space-x-2 hover:bg-blue-700 transition-colors">
                        <span>Đăng nhập</span>

                    </button>
                </div>
            </nav>
            {/* Component Sidebar Mobile (giải thích bên dưới) */}
            <MobileSidebar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        </>
    )
}

export default Navbar

import { HiX } from 'react-icons/hi';

const MobileSidebar = ({ isOpen, setIsOpen }) => {
    return (
        <>
            {/* Lớp nền mờ (Overlay) */}
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden
                            ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />

            {/* Nội dung Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-72 bg-white z-50 p-6 transform transition-transform duration-300 lg:hidden
                            ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Header của Sidebar (Logo + Nút đóng) */}
                <div className="flex justify-between items-center mb-8">
                    <span className="font-bold text-xl">XtraClinic</span>
                    <button onClick={() => setIsOpen(false)} className="text-2xl">
                        <HiX />
                    </button>
                </div>

                {/* Danh sách link trong Sidebar */}
                <ul className="space-y-4">
                    <li><a href="/trang-chu" className="text-lg text-gray-700">Trang chủ</a></li>
                    <li><a href="/dich-vu" className="text-lg text-gray-700">Dịch vụ</a></li>
                    <li><a href="/dat-lich" className="text-lg text-gray-700">Đặt lịch</a></li>
                    <li><a href="/lien-he" className="text-lg text-gray-700">Liên hệ</a></li>
                </ul>
            </div>
        </>
    );
};