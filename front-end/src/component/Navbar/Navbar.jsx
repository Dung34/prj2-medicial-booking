import React from 'react'
import logo from '../../assets/Icons/medicine.png'
const Navbar = () => {
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
                        src={logo} // Replace with your logo path
                        alt="XtraClinic Logo"
                        className="h-10 w-auto ml-[30px]"
                    />
                    <span className="font-semibold text-2xl">XtraClinic</span>
                </div>

                {/* Navigation Links */}
                <nav className="flex items-center space-x-4">
                    <a href="#" className="text-gray-700 hover:text-blue-500">
                        <span className='transition-all border-b-transparent hover:border-b-[#ffba00]'>
                            Home
                        </span>
                    </a>
                    <a href="#" className="text-gray-700 hover:text-blue-500">About Us</a>
                    <a href="#" className="text-gray-700 hover:text-blue-500">Services</a>
                    <a href="#" className="text-gray-700 hover:text-blue-500">FAQ's</a>
                    <a href="#" className="text-gray-700 hover:text-blue-500">Blog</a>
                    <a href="#" className="text-gray-700 hover:text-blue-500">Shop</a>
                    <a href="#" className="text-gray-700 hover:text-blue-500">Contact Us</a>
                    <a
                        href="#"
                        className="bg-blue-800 text-white px-4 py-2 rounded-full flex items-center space-x-2"
                    >
                        <span>Book Appointment</span>
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
                    </a>
                </nav>
            </div>
        </header>
    )
}

export default Navbar

