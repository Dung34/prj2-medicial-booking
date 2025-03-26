import React from 'react'
import facebookLogo from '../../assets/Icons/facebook.png'
import InstagramLogo from '../../assets/Icons/instagram.png'
import twitterLogo from '../../assets/Icons/twitter.png'
const DoctorCard = () => {
    return (
        <div className='bg-white relative flex flex-col w-[20vw] h-full py-[10px] shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] p-[20px] rounded-2xl'>
            <div className='mt-[-100px]'>
                <img src="https://xtratheme.com/elementor/medical-2/wp-content/uploads/sites/115/2022/06/team3.jpg" alt="DoctorImage"
                    className='w-[20vw] rounded-full' />
            </div>
            <h2 className='text-[20px] font-sans text-black m-2'>Doctor Name</h2>
            <p>Speciality + Decription</p>
            <div className='flex flex-row justify-self-start items-center gap-4 my-2'>
                <button className='flex justify-center shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] size-[35px] rounded-full bg-white items-center'>
                    <img src={facebookLogo} alt="f-icon" className='size-4' />
                </button>
                <button className='flex justify-center shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] size-[35px] rounded-full bg-white items-center'>
                    <img src={InstagramLogo} alt="f-icon" className='size-4' />
                </button>
                <button className='flex justify-center shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] size-[35px] rounded-full bg-white items-center'>
                    <img src={twitterLogo} alt="f-icon" className='size-4' />
                </button>
            </div>
        </div>
    )
}

export default DoctorCard
