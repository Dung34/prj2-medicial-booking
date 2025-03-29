import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
const Appointment = () => {
    const { doctor_id } = useParams()
    const [doctor, setDoctor] = React.useState({})
    const [patient, setPatient] = React.useState({})
    const [haveData, setHaveData] = React.useState(false)
    const patient_id = localStorage.getItem('patient_id')
    const headers = {
        Authorization: `${localStorage.getItem('token')}`,

    }
    useEffect(() => {
        const fetchData = async (doctor_id, patient_id) => {
            try {
                const doctorRes = await axios.get(`http://localhost:3000/api/doctor/${doctor_id}`,
                    { headers: headers })
                if (doctorRes.status === 200) {
                    setDoctor(doctorRes.data)

                }
                const patientRes = await axios.get(`http://localhost:3000/api/patient/${patient_id}`,
                    { headers: headers })
                if (patientRes.status === 200) {
                    setPatient(patientRes.data)

                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData(doctor_id, patient_id)
    })
    return (
        <div>

            <h1 className='text-center text-3xl font-bold'>Appointment</h1>
            <form action="">
                <div className='flex flex-col justify-center items-center'>
                    <div className='m-4 p-4 border rounded shadow-lg'>
                        <h2 className='text-xl font-bold'>Doctor</h2>
                        <p>{doctor.fullname}</p>
                        <p>{doctor.email}</p>
                        <p>{doctor.phoneNumber}</p>
                    </div>
                    <div className='m-4 p-4 border rounded shadow-lg'>
                        <h2 className='text-xl font-bold'>Patient</h2>
                        <p>{patient.fullname}</p>
                        <p>{patient.email}</p>
                        <p>{patient.phoneNumber}</p>
                    </div>
                </div>
                <button type="submit" className='bg-blue-500 text-white p-2 rounded'>Book Appointment</button>
            </form>
        </div>
    )
}

export default Appointment
