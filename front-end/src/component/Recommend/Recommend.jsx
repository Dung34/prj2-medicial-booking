import React from 'react'
import DoctorCard from '../DoctorCard/DoctorCard'

const Recommend = () => {
    return (
        <div className=' flex p-0 m-0 bg-gray-100 justify-center items-center flex-col'>
            <div className='mb-[150px]'>
                <h1 className='text-[36px] font-semibold font-sans text-black'>Meet our awesome <span className='text-[#0cb8b6]'>Experts</span></h1>
                <p className='text-[16px] font-sans text-black'>Our ability to deliver outstanding results for our clients<br />
                    starts with our team of experts.</p>
            </div>
            <div className='mb-[80px] flex flex-row gap-[80px]'>
                {/* DoctorCard */}
                <DoctorCard />
                <DoctorCard />
                <DoctorCard />
            </div>
        </div>
    )
}

export default Recommend
