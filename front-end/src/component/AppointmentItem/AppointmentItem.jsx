import React, { useState, useEffect } from 'react'
import StatusBadge from '../StatusBadge/StatusBadge'

import { FaRegCalendarAlt } from 'react-icons/fa'
import { CiClock1 } from 'react-icons/ci'
import bullet from '../../assets/Icons/bullet.png'
import axios from 'axios';
const AppointmentItem = ({ appointment, handleClick }) => {
    const [patient, setPatient] = useState({})
    const [doctor, setDoctor] = useState({})
    const [error, setError] = useState(null)
    const token = localStorage.getItem('token')
    const apiUrl = import.meta.env.VITE_API_URL
    useEffect(() => {
        const getData = async () => {
            const patientRes = await axios.get(`${apiUrl}/api/patient/${appointment.patient_id}`, {
                headers: {
                    "Authorization": token
                }
            })
            if (patientRes.status === 200) {
                setPatient(patientRes.data)
            }
            const doctorRes = await axios.get(`${apiUrl}/api/doctor/get-doctor/${appointment.doctor_id}`, {
                headers: {
                    "Authorization": token
                }
            })
            if (doctorRes.status === 200) {
                setDoctor(doctorRes.data)
            }

        }
        getData();
    }, [])
    return (
        <div
            className='grid grid-cols-6 gap-4 items-center p-4 border-t hover:bg-gray-50'>
            <p className="text-gray-800">{appointment._id}</p>
            <div className="flex items-center gap-3">

                <div>
                    <p className="font-medium text-gray-900">{doctor.fullname}</p>
                    <p className="font-light text-gray-500">{doctor.email}</p>
                </div>
            </div>

            {/* Date & Time */}
            <div className="text-sm text-gray-800">
                <p className="flex items-center gap-1">
                    <FaRegCalendarAlt className='size-4' /> {appointment.date}
                </p>
                <p className="flex items-center gap-1">
                    <CiClock1 className='size-4' /> {appointment.time}
                </p>
            </div>

            {/* Doctor */}
            <div>
                <p className="text-gray-800">{patient.sername} {patient.name}</p>
                <p className="text-gray-800">SĐT: {patient.phoneNumber}</p>
            </div>




            {/* Status */}
            <StatusBadge status={appointment.status} />

            {/* Actions */}
            <div className="flex justify-between">
                <p className='text-gray-800'>{appointment.note}</p>
                <button onClick={handleClick}><img src={bullet} className='size-6' alt="" /></button>
            </div>

        </div>
    )
}

export default AppointmentItem
