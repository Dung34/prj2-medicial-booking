import React from 'react';

const Services = () => {
    return (
        <div className="text-center py-16 px-4">
            <div className="mb-8">
                <h1 className="text-4xl font-semibold mb-2">Services</h1>
                <h2 className="text-2xl text-gray-500 mb-4">Services That We Provide</h2>
                <p className="text-gray-700 max-w-2xl mx-auto">
                    Comprehensive physical examination, also simply known as a "physical", is a process in which the physician.
                </p>
            </div>
            <div className="flex flex-wrap justify-center mb-8">
                <div className="flex flex-col items-center m-4 w-48">
                    <img src="/path/to/birth-control-icon.png" alt="Birth Control" className="w-20 h-20 mb-2" />
                    <h3 className="text-lg font-medium">Birth Control</h3>
                </div>
                <div className="flex flex-col items-center m-4 w-48">
                    <img src="/path/to/cold-cough-icon.png" alt="Cold, Cough and Flu" className="w-20 h-20 mb-2" />
                    <h3 className="text-lg font-medium">Cold, Cough and Flu</h3>
                </div>
                <div className="flex flex-col items-center m-4 w-48">
                    <img src="/path/to/primary-care-icon.png" alt="Primary Care" className="w-20 h-20 mb-2" />
                    <h3 className="text-lg font-medium">Primary Care</h3>
                </div>
                <div className="flex flex-col items-center m-4 w-48">
                    <img src="/path/to/high-blood-pressure-icon.png" alt="High Blood Pressure" className="w-20 h-20 mb-2" />
                    <h3 className="text-lg font-medium">High Blood Pressure</h3>
                </div>
            </div>
            <div className="flex flex-wrap justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
                    Book an Appointment
                </button>
                <a href="/services" className="text-blue-500 hover:text-blue-700 m-2">
                    More our services
                </a>
            </div>
        </div>
    );
};

export default Services;