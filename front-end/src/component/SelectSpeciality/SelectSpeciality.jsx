import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SelectSpeciality = () => {
    const [haveData, setHaveData] = useState(false)
    const [specialities, setSpecialities] = useState([])
    const navigate = useNavigate()
    const handleClick = (speciality_id) => {
        navigate(`/doctors/${speciality_id}`)
    }
    // const getSpecialities = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:3000/speciality')
    //         if (response.status == 200) {
    //             setSpecialities(response.data)
    //             console.log(response.data)
    //         }

    //     } catch (error) {

    //     }
    // }

    useEffect(() => {
        const getSpecialities = async () => {
            try {
                const response = await axios.get('http://localhost:3000/speciality')
                if (response.status === 200) {
                    setSpecialities(response.data)
                    console.log(response.data)
                }
            } catch (error) {
                console.error('Error:', error)
            }
        }
        getSpecialities()
    }, [])
    return (
        <div className='flex flex-row justify-around'>
            {specialities.map((speciality) => (
                <div key={speciality._id}
                    className="flex flex-col items-center size-20"
                    onClick={() => handleClick(speciality._id)}>
                    <img src={`/Speciality/${speciality.speciality_name}.png`} alt={speciality.speciality_name} />
                    <p>{speciality.speciality_name}</p>
                    {/* <button onClick={() => handleClick(speciality.id)}>{speciality.name}</button> */}
                </div>
            ))}
        </div>
    )
}

export default SelectSpeciality

