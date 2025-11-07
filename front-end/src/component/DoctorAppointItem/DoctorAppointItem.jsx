import React, { useState, useEffect } from 'react'
import axios from 'axios'

import StatusBadge from '../StatusBadge/StatusBadge';
import { CiUser, CiCalendar, CiClock1, CiCircleList } from "react-icons/ci";
const DoctorAppointItem = ({ appointment, handleClick, isSelected }) => {
    const apiUrl = import.meta.env.VITE_API_URL
    const [patient, setPatient] = useState({})
    const token = localStorage.getItem('token')
    useEffect(() => {
        const getPatient = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/patient/${appointment.patient_id}`, {
                    headers: {
                        "Authorization": token
                    }
                })
                if (response.status == 200) {
                    setPatient(response.data)
                    console.log(response.data)
                }
            } catch (error) {

            }
        }
        getPatient()
    }, [])
    return (
        <tr onClick={handleClick}>
            <td className='px-2 font-mono'>{appointment._id}</td>
            <td className='flex flex-row items-center gap-2'>
                <CiUser className='size-6' />
                <div className='flex flex-col items-start gap-0'>
                    <p className='text-[16px] font-mono'>{patient.sername} {patient.name}</p>
                    <p className='text-[14px] text-gray-400'>{patient.email}</p>
                </div>
            </td>
            <td>
                <div className='flex flex-col'>
                    <div className='flex flex-row items-center gap-2'>
                        <CiCalendar />
                        <p>{appointment.date}</p>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                        <CiClock1 />
                        <p>{appointment.time}</p>
                    </div>
                </div>
            </td>
            <td>
                < StatusBadge status={appointment.status} />
            </td>
            <td>
                <CiCircleList />
            </td>
        </tr>
    )
}

export default DoctorAppointItem
