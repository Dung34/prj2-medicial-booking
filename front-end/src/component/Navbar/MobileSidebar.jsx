import React from 'react';
// Icon để đóng menu
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