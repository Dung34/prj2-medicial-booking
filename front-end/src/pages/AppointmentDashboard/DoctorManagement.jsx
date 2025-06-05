import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CiSearch } from "react-icons/ci";
import DoctorCard1 from '../../component/DoctorCard1'
const DoctorManagement = () => {
    const [doctors, setDoctors] = useState([])
    const [specialities, setSpecialities] = useState([])
    const [selectedId, setSelectedId] = useState('')
    const apiUrl = import.meta.env.VITE_API_URL
    const [search, setSearch] = useState('')
    const [filteredDoctors, setFilteredDoctors] = useState([])

    useEffect(() => {
        const getSpecialities = async () => {
            const response = await axios.get(`${apiUrl}/speciality`)
            if (response.status === 200) {
                setSpecialities(response.data)
            }
        }
        getSpecialities()
    }, [])
    useEffect(() => {
        const getDoctors = async () => {
            const response = await axios.get(`${apiUrl}/api/doctor`, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            })
            if (response.status === 200) {
                setDoctors(response.data)
                setFilteredDoctors(response.data)
            }
        }
        getDoctors()
    }, [])

    const handleSelect = (e) => {
        const selectedSpecialityId = e.target.value
        setSelectedId(selectedSpecialityId)
        filterDoctors(selectedSpecialityId, search)
    }

    const handleSearch = (e) => {
        const searchTerm = e.target.value
        setSearch(searchTerm)
        filterDoctors(selectedId, searchTerm)
    }

    const filterDoctors = (specialityId, searchTerm) => {
        let filtered = [...doctors]

        // Filter by speciality
        if (specialityId) {
            filtered = filtered.filter(doctor => doctor.speciality_id === specialityId)
        }

        // Filter by search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase()
            filtered = filtered.filter(doctor =>
                doctor.fullname.toLowerCase().includes(term)
            )
        }

        setFilteredDoctors(filtered)
    }

    return (
        <div className='p-4 flex flex-col gap-10 md:flex-row items-start justify-center'>
            <div className='flex flex-col justify-start items-center border border-gray-300 rounded-lg p-4 w-full md:w-1/4'>
                <h1 className='text-xl font-bold mb-4'>Quản lý bác sĩ</h1>
                <div className='w-full'>
                    <div className='flex flex-col gap-4'>
                        <div>
                            <p className='text-gray-600 mb-2'>Tìm kiếm</p>
                            <div className='flex flex-row items-center gap-2'>
                                <CiSearch className='text-gray-500' />
                                <input
                                    type="text"
                                    placeholder='Tên bác sĩ'
                                    className='w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-black'
                                    value={search}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                        <div>
                            <p className='text-gray-600 mb-2'>Chuyên khoa</p>
                            <div className='w-full'>
                                <select
                                    className='w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-black'
                                    name="speciality"
                                    id="speciality"
                                    value={selectedId}
                                    onChange={handleSelect}
                                >
                                    <option value="">Tất cả chuyên khoa</option>
                                    {specialities.map((speciality) => (
                                        <option
                                            className='font-sans text-[16px] text-black'
                                            key={speciality._id}
                                            value={speciality._id}
                                        >
                                            {speciality.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full md:w-3/4'>
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor) => (
                        <div key={doctor._id}>
                            <DoctorCard1 doctor={doctor} />
                        </div>
                    ))
                ) : (
                    <div className='col-span-full text-center text-gray-500 py-8'>
                        Không tìm thấy bác sĩ nào
                    </div>
                )}
            </div>
        </div>
    )
}

export default DoctorManagement
