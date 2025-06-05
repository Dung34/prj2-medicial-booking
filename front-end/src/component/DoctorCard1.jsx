import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaRegAddressBook } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { useNavigate } from 'react-router-dom'
const DoctorCard1 = ({ doctor }) => {
  const navigate = useNavigate()
  const [doctorData, setDoctorData] = useState(doctor)
  const [schedules, setSchedules] = useState([])
  const [error, setError] = useState(null)
  const [imageUrl, setImageUrl] = useState({})
  const [speciality, setSpeciality] = useState('')
  const apiUrl = import.meta.env.VITE_API_URL
  useEffect(() => {
    const fetchDoctor = async () => {
      const response = await axios.get(`${apiUrl}/api/doctor/schedule/${doctor._id}`)
      if (response.status == 200) {
        setSchedules(response.data.workingHours)
        console.log(response.data)
      }
      else {
        setError(response.data.message)
      }
    }
    fetchDoctor()
  }, [doctor._id])

  useEffect(() => {
    const fetchImage = async () => {
      const response = await axios.get(`${apiUrl}/api/doctor/profile-image?doctor_id=${doctor._id}`)
      if (response.status == 200) {
        setImageUrl(response.data.imageUrl)

      }
      else {
        setError(response.data.message)
      }
    }
    fetchImage()
  }, [doctor._id])
  useEffect(() => {
    const fetchSpeciality = async () => {
      const response = await axios.get(`${apiUrl}/speciality/searchSpecialitybyId/${doctorData.speciality_id}`)
      setSpeciality(response.data.title)
    }
    fetchSpeciality()
  }, [doctorData.doctor_id])
  const handleClick = () => {
    navigate("/dashboard/edit", {
      state: {
        doctor: doctor
      }
    })
  }
  return (
    <div className='doctor-card border border-gray-300 rounded-lg'>
      <div className='flex flex-row items-center gap-4 m-4'>
        <img src={`${imageUrl}`} alt={doctorData.fullname} className='w-16 h-16 rounded-full' />
        <div>
          <h1 className='text-xl font-bold'>Bác sĩ.{doctorData.fullname}</h1>
          <p className='text-sm text-gray-500 border border-gray-300 rounded-full px-3 w-fit'>{speciality}</p>

        </div>

      </div>
      <hr className='text-gray-300' />
      <div className='flex flex-row items-center gap-2 m-2'>
        <FaRegAddressBook className='text-gray-500' />
        <p className='text-sm text-gray-500'>{doctorData.address}</p>
      </div>
      <div className='flex flex-row items-center gap-2 m-2'>
        <CiMail className='text-gray-500' />
        <p className='text-sm text-gray-500'>{doctorData.email}</p>
      </div>

      <div className='flex flex-row items-center gap-2 m-2'>
        <CiPhone className='text-gray-500' />
        <p className='text-sm text-gray-500'>{doctorData.phoneNumber}</p>

      </div>
      <div className='flex flex-row items-center gap-2 m-2'>
        <CiCalendar className='text-gray-500' />
        <div className='text-sm text-gray-500 grid grid-cols-4 gap-2'>
          {Array.isArray(schedules) && schedules.length > 0 ? (
            schedules.map((schedule, index) => (
              <div className='border border-gray-300 rounded-full px-1' key={index}>
                {schedule.day}
              </div>
            ))
          ) : (
            <span>Không có lịch làm việc</span>
          )}
        </div>
      </div>
      <hr className='text-gray-300' />
      <div className='grid grid-cols-2 gap-2 mx-2 mt-2 mb-4'>
        <button className='bg-black text-white px-4 py-2 rounded-lg'>Đặt lịch</button>
        <button onClick={handleClick} className='bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-100'>Chỉnh sửa</button>
      </div>
    </div>
  )
}

export default DoctorCard1
