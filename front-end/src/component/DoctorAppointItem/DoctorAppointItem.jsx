import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaCalendarPlus } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import StatusBadge from '../StatusBadge/StatusBadge';
const DoctorAppointItem = ({ appointment, handleClick, isSelected }) => {
    const apiUrl = import.meta.env.VITE_API_URL
    const [patient, setPatient] = useState({})
    const token = localStorage.getItem('token')
    useEffect(() => {
        const getPatient = async () => {
            try {
                const patient = await axios.get(`${apiUrl}/api/patient/${appointment.patient_id}`, {
                    headers: {
                        "Authorization": token
                    }
                })
                if (patient.status == 200) {
                    setPatient(patient.data)
                }
            } catch (error) {

            }
        }
        getPatient()
    }, [])
    return (
        <div onClick={handleClick}
            className={`border border-gray-400 py-4 px-8 rounded-md my-3 cursor-pointer transition-all duration-200 ${isSelected
                ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'
                }`}>
            <h1 className='font-medium text-[24px] p-0 mb-2'>{patient.fullname}</h1>
            <p className='font-sans text-gray-600'>SĐT: {patient.phoneNumber}</p>
            <div className='flex flex-row justify-start my-2'>
                <div className='flex w-1/3 flex-rows justify-start items-center gap-2'>
                    <FaCalendarPlus className='size-4' />
                    <p>{appointment.date}</p>
                </div>
                <div className='flex w-1/3 flex-rows justify-start items-center gap-2'>
                    <FaRegClock className='size-4' />
                    <p>{appointment.time}</p>
                </div>
            </div>


            <StatusBadge status={appointment.status}></StatusBadge>
        </div>
    )
}

export default DoctorAppointItem
