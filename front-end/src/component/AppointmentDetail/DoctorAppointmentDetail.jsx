import React, { useState, useEffect } from 'react'
import axios from 'axios'
import StatusBadge from '../StatusBadge/StatusBadge'
import { CiCalendarDate } from "react-icons/ci";
import { CiStickyNote } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import EMR from './EMR';
const DoctorAppointmentDetail = ({ appointment, isSelect }) => {
  const navigate = useNavigate()
  const [patient, setPatient] = useState({})
  const [note, setNote] = useState("")
  const [doctor, setDoctor] = useState({})
  const [notification, setNotification] = useState("")
  const [localAppointment, setLocalAppointment] = useState({})
  const apiUrl = import.meta.env.VITE_API_URL
  const token = localStorage.getItem('token')
  const saveNote = async (note) => {
    try {
      const response = await axios.post(`${apiUrl}/appointment/update/${appointment._id}`, {
        "note": `Bác sĩ ${doctor.fullname}: ${note}`
      })
      if (response.status == 200) {
        alert("Luu ghi chu thanh cong !!")
      }
      else {
        alert("Luu ghi chu that bai !!")
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/patient/${appointment.patient_id}`, {
          headers: {
            "Authorization": token
          }
        })
        if (response.status == 200) {
          setPatient(response.data)
        }
        const doctorRes = await axios.get(`${apiUrl}/api/doctor/get-doctor/${appointment.doctor_id}`, {
          headers: {
            "Authorization": token
          }
        })
        if (doctorRes.status == 200) {
          setDoctor(doctorRes.data)
        }
      } catch (error) {

      }
    }
    setLocalAppointment({})
    getData()
    setLocalAppointment(appointment)
  }, [appointment._id])
  return (
    <div className='m-4'>
      <div className='flex flex-col p-4 border border-gray-400 rounded-md'>
        <div className='flex flex-row justify-between'>
          <StatusBadge status={appointment.status} />
          <div className='space-x-2'>
            {appointment.isSuccess ? <button className='border py-2 px-4 rounded-md border-gray-400 hover:bg-gray-200 bg-white text-black' type="button">Điều chỉnh</button> :
              appointment.status == 'confirm' ?
                <button onClick={() => navigate(`/emr/${appointment._id}`)}
                  className='py-2 px-4 rounded-md border-gray-400 bg-black text-white' type="button">Hoàn thành</button>
                : null
            }


          </div>
        </div>
        <div>
          <h1 className='font-bold text-[24px] text-black'>{patient.fullname}</h1>
        </div>
        <div>
          <div className='flex flex-row gap-2 items-center'>
            <CiCalendarDate className='size-4' />
            <p className='font-sans text-[20px] text-black'>Thời gian</p>
          </div>
          <p className='font-sans text-[16px] text-gray-500'>{appointment.time} ngày {appointment.date}</p>

        </div>
        <div>
          <div className='flex flex-row gap-2 items-center'>
            <CiStickyNote className='size-4' />
            <p className='font-sans text-[20px] text-black'>Ghi chú</p>
          </div>

          <p className='font-sans text-[16px] text-gray-500'>{appointment.note}</p>
        </div>
        <div>
          <div className='flex flex-row gap-2 items-center' >
            <CiPhone className='size-4' />
            <p className='font-sans text-[20px] text-black' >Liên hệ</p>
          </div>

          <p className='font-sans text-[16px] text-gray-500'>SĐT: {patient.phoneNumber}</p>
          <p className='font-sans text-[16px] text-gray-500'>Email: {patient.email}</p>
        </div>
      </div>
      <div className='flex flex-col gap-2 p-4 border border-gray-400 rounded-md mt-8' >
        <p className='font-sans text-[20px] text-black'>Ghi chú</p>
        <input className=' border border-gray-200 p-2 rounded-md ' type="text" name="" id="" value={note || ""}
          onChange={(e) => { setNote(e.target.value) }} />
        <div className='flex justify-end'><button onClick={(e) => saveNote(note)} className='border border-gray-200 py-2 px-4 bg-white text-black hover:bg-gray-200 rounded-md'>Lưu</button></div>
      </div>

    </div>

  )
}

export default DoctorAppointmentDetail
