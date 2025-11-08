import React from 'react';
// Icon cho nút "Xem thêm" và "Next"
// Chạy: npm install react-icons
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

// --- DỮ LIỆU MẪU ---
// Bạn sẽ thay thế 'imageSrc' bằng đường dẫn đến ảnh/SVG của bạn
const specialties = [
    {
        title: 'Cơ Xương Khớp',
        imageSrc: '/Speciality/chanthuong.png', // Đường dẫn ảnh của bạn
        bgColor: 'bg-blue-50', // Màu nền nhạt cho ảnh
    },
    {
        title: 'Thần kinh',
        imageSrc: '/Speciality/thankinh.png', // Đường dẫn ảnh của bạn
        bgColor: 'bg-blue-50',
    },
    {
        title: 'Tiêu hóa',
        imageSrc: '/Speciality/tieuhoa.png', // Đường dẫn ảnh của bạn
        bgColor: 'bg-blue-50',
    },
    {
        title: 'Tim mạch',
        imageSrc: '/Speciality/tim.png', // Thêm một thẻ nữa để demo cuộn
        bgColor: 'bg-red-50',
    },
    {
        title: 'Da liễu',
        imageSrc: '/Speciality/dalieu.png', // Thêm một thẻ nữa để demo cuộn
        bgColor: 'bg-red-50',
    },
    {
        title: 'Hô hấp',
        imageSrc: '/Speciality/hohap.png', // Thêm một thẻ nữa để demo cuộn
        bgColor: 'bg-red-50',
    },
    // ... thêm các chuyên khoa khác
];

// --- COMPONENT THẺ CHUYÊN KHOA ---
const SpecialtyCard = ({ title, imageSrc, bgColor }) => {
    return (
        // Thẻ bọc ngoài
        // 'flex-shrink-0' rất quan trọng để thẻ không bị bóp lại khi cuộn
        // 'w-64' đặt chiều rộng cố định cho thẻ
        <div className="flex-shrink-0 w-64 bg-white p-4 rounded-xl shadow-md
                        transition duration-300 hover:shadow-lg">

            {/* Vùng chứa ảnh */}
            <div className={`p-6 rounded-lg ${bgColor}`}>
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-40 object-contain" // Giả định chiều cao 40
                />
            </div>

            {/* Tiêu đề */}
            <h3 className="text-lg font-semibold text-gray-800 text-center mt-4">
                {title}
            </h3>
        </div>
    );
};

// --- COMPONENT SECTION CHÍNH ---
const SpecialtiesSection = () => {
    return (
        <div className="bg-white py-12 px-4">
            <div className="container mx-auto max-w-6xl">

                {/* 1. Header: Tiêu đề và nút "Xem thêm" */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Chuyên khoa
                    </h2>
                    <a
                        href="/chuyen-khoa"
                        className="bg-cyan-50 text-cyan-700 font-semibold px-5 py-2 rounded-full
                                   hover:bg-cyan-100 transition-colors"
                    >
                        Xem thêm
                    </a>
                </div>

                {/* 2. Vùng chứa danh sách cuộn và nút điều hướng */}
                {/* 'relative' để định vị các nút mũi tên */}
                <div className="relative">

                    {/* Danh sách cuộn ngang */}
                    {/* - 'overflow-x-auto': Bật cuộn ngang
                      - 'space-x-6': Tạo khoảng cách giữa các thẻ
                      - 'scrollbar-hide': Class tùy chỉnh để ẩn thanh cuộn (xem ghi chú)
                    */}
                    <div className="flex space-x-6 overflow-x-auto p-2 scrollbar-hide">
                        {specialties.map((item, index) => (
                            <SpecialtyCard
                                key={index}
                                title={item.title}
                                imageSrc={item.imageSrc}
                                bgColor={item.bgColor}
                            />
                        ))}
                    </div>

                    {/* Nút "Next" (giống trong ảnh) */}
                    {/* - 'absolute': Định vị tuyệt đối
                      - 'right-0': Đặt ở bên phải
                      - 'top-1/2 -translate-y-1/2': Căn giữa theo chiều dọc
                      - '-mr-4' hoặc 'right-0 translate-x-1/2': Đẩy nút ra ngoài lề
                    */}
                    <button
                        className="absolute right-0 top-1/2 -translate-y-1/2 
                                   bg-white shadow-lg rounded-full p-2
                                   text-gray-600 hover:bg-gray-100
                                   transform translate-x-1/2" // Đẩy 1 nửa nút ra ngoài
                    >
                        <IoIosArrowForward size={24} />
                    </button>

                    {/* (Tùy chọn) Nút "Previous" */}
                    {/* <button 
                        className="absolute left-0 top-1/2 -translate-y-1/2 
                                   bg-white shadow-lg rounded-full p-2
                                   text-gray-600 hover:bg-gray-100
                                   transform -translate-x-1/2" // Đẩy 1 nửa nút ra ngoài
                    >
                        <IoIosArrowBack size={24} />
                    </button> */}

                </div>

            </div>
        </div>
    );
};

export default SpecialtiesSection;