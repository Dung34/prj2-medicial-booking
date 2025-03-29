import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
const ListDoctor = () => {
    const navigate = useNavigate()
    const handleClick = (doctor_id) => {
        navigate(`/appointment/${doctor_id}`)
    }
    const { speciality_name } = useParams()
    const [doctors, setDoctors] = React.useState([])
    const [haveData, setHaveData] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(false)
    React.useEffect(() => {
        const fetchData = async (speciality_name) => {
            try {
                const response = await axios.get(`http://localhost:3000/speciality/getDocBySpecialityName/${speciality_name}`)
                if (response.status === 200) {
                    setDoctors(response.data)
                    console.log(response.data)
                    setHaveData(true)
                }

            } catch (error) {

            }
        }
        fetchData(speciality_name)
    })
    return (
        <div>
            <h1 className='text-center text-3xl font-bold'>List of Doctors</h1>
            <div className='flex flex-wrap justify-center'>
                {doctors.map((doctor) => (
                    <div
                        onClick={() => handleClick(doctor._id)}
                        key={doctor._id} className='m-4 p-4 border rounded shadow-lg'>
                        <h2 className='text-xl font-bold'>{doctor.fullname}</h2>
                        <p>{doctor.email}</p>
                        <p>{doctor.phoneNumber}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListDoctor
