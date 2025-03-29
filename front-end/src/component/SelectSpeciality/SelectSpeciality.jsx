import React, { useEffect, useState } from 'react'
import huyethoc from '../../assets/Images/Speciality/blood-test.png'
import thankinh from '../../assets/Images/Speciality/brainstorm.png'
import tieuhoa from '../../assets/Images/Speciality/gastroenterology.png'
import tim from '../../assets/Images/Speciality/healthcare.png'
import nhi from '../../assets/Images/Speciality/pediatrics.png'
import hohap from '../../assets/Images/Speciality/respiratory-system.png'
import dalieu from '../../assets/Images/Speciality/skin.png'
import chanthuong from '../../assets/Images/Speciality/chanthuong.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SelectSpeciality = () => {
    const [haveData, setHaveData] = useState(false)
    const [specialities, setSpecialities] = useState([])
    const navigate = useNavigate()
    const handleClick = (speciality_name) => {
        navigate(`/doctors/${speciality_name}`)
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
                <div key={speciality._id} className="flex flex-col items-center size-20" onClick={() => handleClick(speciality.speciality_name)}>
                    <img src={speciality.speciality_name} alt={speciality.name} />
                    <p>{speciality.speciality_name}</p>
                    {/* <button onClick={() => handleClick(speciality.id)}>{speciality.name}</button> */}
                </div>
            ))}
        </div>
    )
}

export default SelectSpeciality

