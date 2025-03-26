import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import MySwiperSlide from '../MySwiperSlide/MySwiperSlide';
const Reviews = () => {
    return (
        <div className='bg-gray-100 w-[100vw] h-[100vh] justify-center items-center flex'>
            <div className='bg-white w-[80vw] h-[70vh] rounded-2xl shadow-[-9px_10px_11px_-1px_rgba(0,_0,_0,_0.35)]'>
                {/* Review swiper */}
                <Swiper navigation={true} modules={[Navigation]} className="w-[60%] flex justify-between">
                    <SwiperSlide>
                        <MySwiperSlide />
                    </SwiperSlide>
                    <SwiperSlide>
                        <MySwiperSlide />
                    </SwiperSlide>
                    <SwiperSlide>
                        <MySwiperSlide />
                    </SwiperSlide>

                </Swiper>
                {/* DoctorImage */}
                <div></div>
            </div>
        </div>
    )
}

export default Reviews
