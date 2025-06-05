import React from 'react'
import Navbar from '../../component/Navbar/Navbar'
import { useEffect, useState } from 'react'
import { data, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
const DoctorEdit = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [doctor, setDoctor] = useState({})

    const [isLoading, setIsLoading] = useState(true)
    const [urlImage, setUrlImage] = useState('')
    const apiUrl = import.meta.env.VITE_API_URL
    useEffect(() => {
        const getDoctor = async () => {
            try {
                const res = await axios.get(`${apiUrl}/api/doctor/get-doctor/${location.state.doctor._id}`)
                if (res.status === 200) {
                    setDoctor(res.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getDoctor()
    }, [])
    useEffect(() => {
        const getUrlImage = async () => {
            try {


                if (doctor) {
                    const res = await axios.get(`${apiUrl}/api/doctor/profile-image?doctor_id=${location.state.doctor._id}`)
                    if (res.status == 200) {
                        setUrlImage(res.data.imageUrl)
                    }
                }

            } catch (error) {
                console.log(error)
            }
        }
        getUrlImage()
    }, [])
    const handleCancel = (e) => {
        navigate('/dashboard', {
            doctor: null
        })
    }
    const handleEdit = async (doctor) => {
        try {
            const response = await axios.post(`${apiUrl}/api/doctor/update/${location.state.doctor._id}`, {

                "fullname": doctor.fullname,
                "phoneNumber": doctor.phoneNumber,
                "email": doctor.email,

                "address": doctor.address,


            })
            if (response.status == 200) {
                console.log("done!!")
                alert("Chinh sua thanh cong !")
            }
        } catch (error) {

        }
    }
    return (
        <div >
            <Navbar />
            <div className='flex flex-col p-4'>
                <h1 className='text-2xl font-bold'>Thông tin bác sĩ</h1>
                <p className='text-gray-500'>Cập nhật thông tin bác sĩ</p>
            </div>
            <div className='flex flex-col justify-center items-center gap-4'>
                <div className='flex flex-row gap-4'>
                    {/* container ben trai */}
                    <div className='border-2 border-gray-300 rounded-md p-4 flex flex-col gap-4 items-center '>
                        <h1 className='text-black font-sans font-medium'>Ảnh hồ sơ</h1>
                        <div>
                            <img className='w-30 h-30 rounded-full' src={urlImage || null} alt="" />
                        </div>
                        <div className='flex flex-row gap-4'>
                            <button className='bg-black text-white px-4 py-2 rounded-md'>Chọn ảnh</button>
                            <button className='bg-gray-100 border-2 border-gray-400 text-black hover:bg-gray-200 px-4 py-2 rounded-md'>Xác nhận</button>
                        </div>
                    </div>
                    {/* container ben phai */}
                    <div className='border-2 border-gray-300 rounded-md p-4 sm:w-[50vw]'>
                        <h1 className='text-black font-sans font-medium'>Thông tin cá nhân</h1>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='flex flex-col gap-2'>
                                <label className='text-black font-sans font-medium' htmlFor="name">Họ và tên</label>
                                <input onChange={(e) => setDoctor({ ...doctor, fullname: e.target.value })}
                                    className='border-2 border-gray-300 rounded-md p-2' type="text" name="name" id="name" value={doctor.fullname || ""} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-black font-sans font-medium' htmlFor="email">Email</label>
                                <input onChange={(e) => setDoctor({ ...doctor, email: e.target.value })}
                                    className='border-2 border-gray-300 rounded-md p-2' type="text" name="email" id="email" value={doctor.email || ""} />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='flex flex-col gap-2'>
                                <label className='text-black font-sans font-medium' htmlFor="phone">Số điện thoại</label>
                                <input onChange={(e) => setDoctor({ ...doctor, phoneNumber: e.target.value })}
                                    className='border-2 border-gray-300 rounded-md p-2' type="text" name="phone" id="phone" value={doctor.phoneNumber || ""} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-black font-sans font-medium' htmlFor="address">Chuyên khoa</label>
                                <input onChange={(e) => setDoctor({ ...doctor, speciality_id: e.target.value })}
                                    className='border-2 border-gray-300 rounded-md p-2' type="text" name="address" id="address" value={doctor.speciality_id || ""} />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='text-black font-sans font-medium' htmlFor="address">Địa chỉ</label>
                            <input onChange={(e) => setDoctor({ ...doctor, address: e.target.value })}
                                className='border-2 border-gray-300 rounded-md p-2' type="text" name="address" id='address' value={doctor.address || ""} />
                        </div>
                        <div className='flex flex-row justify-end gap-4 mt-4'>
                            <button onClick={(e) => handleEdit(doctor)} className='bg-black text-white px-4 py-2 rounded-md'>Cập nhật</button>
                            <button onClick={handleCancel} className='bg-gray-100 border border-gray-400 text-black hover:bg-gray-200 px-4 py-2 rounded-md'>Hủy bỏ</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2 className='text-black font-sans font-medium'>Thông tin bổ sung</h2>
                <p className='text-gray-500'>Cập nhật thông tin bổ sung</p>
                <div className='grid grid-cols-2 gap-2'>
                    <div>
                        <h3>Trình độ học vấn</h3>
                    </div>
                    <div></div>
                </div>
            </div>

        </div>
    )
}

export default DoctorEdit
