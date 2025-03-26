import React from 'react'

const MySwiperSlide = () => {
    return (

        <div className='flex flex-col py-[100px]'>

            <div className='flex flex-row gap-6'>
                <img src="" alt="user" className='' />
                <div>
                    <span className='text-[18px] text-[#1f2f5f]'>User Name</span>
                    <p className='text-[14px] text-gray-400'>Cancer Patient</p>
                </div>
            </div>
            <div className='flex flex-row '>
                <div className='w-[60%] h-full'>
                    <h1 className='text-[26px]'>An <span>excellent</span> way to <br /> get started</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        Maxime alias ipsa, similique tempore ut optio voluptas architecto commodi
                        possimus ipsum soluta delectus nulla eos sed excepturi facere officia necessitatibus esse!
                    </p>
                    <p>Five stars</p>
                </div>
                <img src="" alt="DoctorImage" className=' w-[40%] h-auto ' />
            </div>


        </div>

    )
}

export default MySwiperSlide
