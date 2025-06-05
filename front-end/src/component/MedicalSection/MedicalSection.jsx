import React from 'react'
import hospital from '../../assets/Images/hospital.jpg'
const MedicalSection = () => {
    return (
        <div className='w-full h-[80vh]'>
            <img src={hospital} alt="hospital" className='w-full h-full object-cover' />
            <div className='absolute top-0 left-0 w-full h-full '>
                <h1 className='text-white text-4xl font-bold text-center mt-10'>Welcome to our hospital</h1>
                <p className='text-white text-2xl text-center mt-5 '>We are a team of experienced doctors and nurses who are dedicated to providing the best possible care to our patients.</p>
            </div>
        </div>
    )
}

export default MedicalSection
