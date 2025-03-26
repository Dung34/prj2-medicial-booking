import React from 'react'
import banner from '../../assets/Images/banner.jpg'
const MedicalSection = () => {
    return (
        <div className="bg-gray-100 py-16 flex flex-row justify-between relative">
            <div className="max-w-4xl mx-auto text-center w-1/2">
                <h2 className="text-3xl font-bold mb-4">We Help to Protect Yourself</h2>
                <p className="text-gray-600 mb-8">
                    A full spectrum multi specialty medical office covering Cardiology, Neurology, Child and Adult Psychiatry.
                </p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full mb-8">
                    Learn More
                </button>
                <div className="flex justify-around">
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold ">15+</span>
                        <span className="text-sm text-gray-600">Years of Services</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold">4k</span>
                        <span className="text-sm text-gray-600">Successful Surgery</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold">32k</span>
                        <span className="text-sm text-gray-600">Satisfied Patients</span>
                    </div>
                </div>
            </div>
            <div className='w-1/2'>
                <img src={banner} alt="" className='absolute h-[30vh] w-auto' />
            </div>
        </div>
    )
}

export default MedicalSection
