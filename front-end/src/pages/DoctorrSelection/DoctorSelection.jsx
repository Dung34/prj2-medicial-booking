import React, { useState, useEffect } from 'react'
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AppointmentSchedule from '../../component/AppointmentSchedule/AppointmentSchedule';
import Navbar from '../../component/Navbar/Navbar';

//     "Tim mạch",
//     "Tiêu hóa",
//     "Hô hấp",
//     "Thần kinh",
//     "Huyết học",
//     "Da liễu",
//     "Chấn thương"
// ];



const DoctorSelection = () => {
    const [selectSpeciality, setSelectSpeciality] = useState(null)
    const [specialities, setSpecialities] = useState([])
    const [haveSpec, setHaveSpec] = useState(false)
    const [doctorName, setDoctorName] = useState("")
    const [doctorsList, setDoctorsList] = useState([])
    const [error, setError] = useState(null)
    const [notification, setNotification] = useState(null)
    const { speciality_id } = useParams()
    const navigate = useNavigate()
    const handleSearch = (doctorName) => {
        if (doctorName) {
            setNotification("Tính năng này chưa khả dụng"),
                setTimeout(() => {
                    setNotification(null)
                }, 2000)
        }

        if (!selectSpeciality) {
            setNotification("Vui lòng chọn chuyên khoa trước")
            setTimeout(() => {
                setNotification(null)
            }, 2000)
        } else {
            navigate(`/doctors/${selectSpeciality._id}`)
            setDoctorsList([])
            setError(null)
            setNotification(null)
        }
    }
    useEffect(() => {
        const getDoctors = async (speciality_id) => {
            try {
                const response = await axios.get(`http://localhost:3000/speciality/getDocBySpecialityName/${speciality_id}`)
                if (response.status === 200) {
                    setDoctorsList(response.data)

                    console.log(response.data[0].availableTime)
                }

                else {
                    setNotification("Không tìm thấy bác sĩ nào")
                    setTimeout(() => {
                        setNotification(null)
                    }, 2000)
                }
            } catch (error) {
                console.error('Error:', error)
                setError("Không tìm thấy bác sĩ nào")

            }
        }
        getDoctors(speciality_id)
    }, [speciality_id])
    useEffect(() => {
        const getSpecialities = async () => {
            try {
                const response = await axios.get('http://localhost:3000/speciality')
                if (response.status === 200) {
                    setSpecialities(response.data)
                    setHaveSpec(true)
                }
                else {
                    setHaveSpec(false)
                }
            } catch (error) {
                console.error('Error:', error)
                setHaveSpec(false)
            }
        }
        getSpecialities()
    }, [])
    const handleSpecialityChange = (speciality) => {
        setSelectSpeciality(prev => (prev === speciality ? null : speciality))

    }
    return (
        <div>
            <Navbar />
            <div className="flex flex-col md:flex-row max-w-7xl mx-auto mt-8 p-4">
                {/* Sidebar */}
                <aside className="w-full md:w-1/4 mb-6 md:mb-0 md:pr-4">
                    <h2 className="text-2xl font-bold mb-2">Danh sách bác sĩ</h2>


                    <input
                        type="text"
                        value={doctorName}
                        onChange={(e) => setDoctorName(e.target.value)}
                        placeholder="Tìm kiếm bác sĩ..."
                        className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />

                    <div>
                        <h3 className="font-semibold mb-2">Chuyên khoa</h3>
                        {!haveSpec && (
                            <div>
                                <p className='text-red-500'>Không có chuyên khoa nào</p>
                                <p className='text-red-500'>Có lỗi xảy ra !</p>
                            </div>
                        )}
                        <ul className="space-y-2">
                            {specialities.map((spec) => (
                                <li key={spec._id}>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectSpeciality === spec}
                                            onChange={() => handleSpecialityChange(spec)}
                                            className="form-checkbox" />
                                        <span>{spec.title}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex justify-center items-center mt-4'>
                        <button onClick={() => handleSearch(doctorName)} type='button'
                            className='bg-[black]  px-4 py-2 flex justify-center items-center rounded-md hover:bg-gray-800 transition'>
                            <FaSearch className='text-white mr-2' />
                            <p className='text-white'>Tìm kiếm</p>
                        </button>
                    </div>
                    {notification && (
                        <div className="mt-4 text-red-500 text-sm">
                            {notification}
                        </div>
                    )}
                </aside>


                {/* Doctor List */}

                <main className="w-full md:w-3/4">
                    <h3 className="text-xl font-semibold mb-4">Bác sĩ phù hợp</h3>
                    {error && (
                        <div className='flex justify-between items-center border-2 border-dotted border-black px-4 py-16 rounded-md'>
                            <p>Hiện không có bác sĩ nào !</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        {doctorsList.map((doc, index) => (
                            <div
                                key={index}
                                className="flex items-start bg-white shadow-md rounded-xl p-4 border border-gray-100"
                            >
                                <div className="w-16 h-16 bg-gray-100 rounded-full mr-4" />

                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold">{doc.fullname}</h4>
                                    <p className="text-sm text-gray-500 mb-1">{doc.education}</p>

                                    {/* <div className="flex items-center text-sm text-gray-600 mb-1">
                                    <FaStar className="text-yellow-400 mr-1" />
                                    <span className="font-medium">{doc.rating}</span>
                                    <span className="ml-1">({doc.reviews} reviews)</span>
                                </div> */}

                                    <div className="flex items-center text-sm text-gray-600 mb-1">
                                        <FaMapMarkerAlt className="mr-1" />
                                        <span>{doc.decription}</span>
                                    </div>
                                    <AppointmentSchedule availbleTime={doc.availableTime} doctorId={doc._id} />

                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DoctorSelection
