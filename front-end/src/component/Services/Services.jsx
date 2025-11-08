import React from 'react';
import {
    FaRobot,
    FaBuilding,
    FaClipboardList,
    FaPhone,
    FaHome,
    FaSyringe,
    FaPills,
    FaCreditCard
} from "react-icons/fa";

const services = [
    {
        name: "Trợ lý AI",
        icon: FaRobot,
        iconBg: 'bg-cyan-50',
        iconColor: 'text-cyan-600'
    },
    {
        name: "Khám chuyên khoa",
        icon: FaBuilding,
        iconBg: 'bg-cyan-50',
        iconColor: 'text-cyan-600'
    },
    {
        name: "Đặt lịch xét nghiệm",
        icon: FaClipboardList,
        iconBg: 'bg-cyan-50',
        iconColor: 'text-cyan-600'
    },
    {
        name: "Tư vấn trực tuyến",
        icon: FaPhone,
        iconBg: 'bg-cyan-50',
        iconColor: 'text-cyan-600'
    },
    {
        name: "Y tế tại nhà",
        icon: FaHome,
        iconBg: 'bg-cyan-50',
        iconColor: 'text-cyan-600'
    },
    {
        name: "Đặt lịch tiêm chủng",
        icon: FaSyringe,
        iconBg: 'bg-cyan-50',
        iconColor: 'text-cyan-600'
    },
    {
        name: "Mua thuốc",
        icon: FaPills,
        iconBg: 'bg-cyan-50',
        iconColor: 'text-cyan-600'
    },
    {
        name: "Thanh toán trực tuyến",
        icon: FaCreditCard,
        iconBg: 'bg-cyan-50',
        iconColor: 'text-cyan-600'
    }
]

const ServiceCard = ({ icon: Icon, title, iconBg, iconColor }) => {
    return (
        <a
            href="#"
            className="flex items-center bg-white px-5 py-2 lg:p-5 md:p-5 rounded-xl shadow-md 
                       transition duration-300 ease-in-out 
                       hover:shadow-lg hover:-translate-y-1"
        >
            {/* Vòng tròn chứa icon */}
            <div className={`flex-shrink-0 p-2 md:p-4 rounded-full ${iconBg}`}>
                <Icon className={`size-4 md:size-6 ${iconColor}`} />
            </div>

            {/* Tên dịch vụ */}
            <h3 className="text-sm lg:text-lg font-semibold text-gray-800 ml-5">
                {title}
            </h3>
        </a>
    );
};
const Services = () => {
    return (
        <div className="bg-gray-50 py-8 px-4">
            <div className="container mx-auto max-w-5xl">

                {/* Tiêu đề */}
                <h2 className="text-lg lg:text-2xl font-semibold text-gray-800 mb-4">
                    Dịch vụ toàn diện
                </h2>

                {/* Lưới các dịch vụ */}
                {/* - 1 cột trên mobile (mặc định)
                  - 2 cột trên tablet/desktop (từ breakpoint 'md' trở lên)
                */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                    {/* Lặp qua mảng services và render mỗi cái là 1 ServiceCard */}
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            icon={service.icon}
                            title={service.name}
                            iconBg={service.iconBg}
                            iconColor={service.iconColor}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Services;