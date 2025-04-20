import React, { useState, useEffect } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import axios from 'axios'
import DoctorAppointItem from '../../component/DoctorAppointItem/DoctorAppointItem'
import DoctorAppointmentDetail from '../../component/AppointmentDetail/DoctorAppointmentDetail'
import Navbar from '../../component/Navbar/Navbar'
import DoctorProfile from '../DoctorProfile/DoctorProfile'
import { CiCalendar, CiUser } from "react-icons/ci";
const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([])
    const [selectAppoint, setSelectAppoint] = useState({})
    const [isSelect, setIsSelect] = useState(false)
    const [successAppointment, setSuccessAppointment] = useState([])
    const [notsuccessAppointment, setNotsuccessAppointment] = useState([])
    const [doctor, setDoctor] = useState({})
    const apiUrl = import.meta.env.VITE_API_URL
    const doctorId = localStorage.getItem("id")
    const onClick = (appointment) => {
        setIsSelect(false)
        setSelectAppoint({})
        setSelectAppoint(appointment)
        setIsSelect(true)
    }
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/appointment/doctor/${doctorId}`)
                const doctorRes = await axios.get(`${apiUrl}/api/doctor/${doctorId}`)
                const success = []
                const notSuccess = []
                if (response.status == 200) {
                    console.log(response.data)
                    response.data.forEach((appointment) => {
                        if (appointment.isSuccess) {
                            success.push(appointment)
                        }
                        else {
                            notSuccess.push(appointment)
                        }
                    })
                }
                setSuccessAppointment(success)
                setNotsuccessAppointment(notSuccess)
                if (doctorRes.status == 200) {
                    setDoctor(doctorRes.data)
                }

            } catch (error) {

            }
        }

        getData()
    }, [])
    return (
        <div>
            <Navbar />
            <TabGroup>
                <TabList className='flex flex-row gap-4 mx-8 items-center justify-start'>
                    <h3 className='font-sans font-medium text-2xl'>Tổng quan</h3>
                    <Tab className='flex flex-row items-center gap-2 data-[selected]:text-black'>
                        <CiCalendar className='size-6' />
                        <p className='font-sans font-light text-gray-600 text-[20px] hover:text-black'>Lịch khám</p>
                    </Tab>
                    <Tab className='flex flex-row items-center gap-2 data-[selected]:text-black'>
                        <CiUser className='size-6' />
                        <p className='font-sans font-light text-gray-600 text-[20px] hover:text-black'>Hồ sơ</p>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div className='px-8 py-2'>
                            <h2 className='font-sans font-bold text-3xl'>Lịch khám </h2>
                            <p className='font-sans font-light text-[16px] text-gray-400'>Xem và quản lý các cuộc hẹn sắp tới</p>
                        </div>
                        <div className='flex flex-row'>
                            <div className='w-4/7'>
                                <TabGroup className='px-8'>
                                    <TabList className="flex bg-gray-200 px-4 py-2 w-fit space-x-2 rounded-md mb-4">
                                        <Tab className="bg-gray-200 text-gray-600 data-[selected]:bg-white data-[selected]:text-black outline-0 py-2 px-2">Sắp tới</Tab>
                                        <Tab className="bg-gray-200 text-gray-600 data-[selected]:bg-white data-[selected]:text-black outline-0 py-2 px-2">Đã hoàn thành</Tab>
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel className="px-8">

                                            {notsuccessAppointment.length > 0 ? (
                                                notsuccessAppointment.map((appointment, index) => (
                                                    <DoctorAppointItem
                                                        key={appointment._id}
                                                        appointment={appointment}
                                                        isSelected={appointment._id === selectAppoint._id}
                                                        handleClick={() => onClick(appointment)}

                                                    />
                                                ))
                                            ) : (
                                                <div>
                                                    <p>Hiện không có cuộc hẹn nào !!!</p>
                                                </div>
                                            )}


                                        </TabPanel>
                                        <TabPanel>
                                            appointments đã hoàn thành
                                        </TabPanel>
                                    </TabPanels>
                                </TabGroup>
                            </div>
                            <div className='w-3/7'>
                                <p className='text-blue-400 font-bold text-3xl'>Thông tin chi tiết</p>
                                {isSelect ? (<DoctorAppointmentDetail appointment={selectAppoint} />) : (null)}
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <DoctorProfile doctor={doctor} />
                    </TabPanel>
                </TabPanels>
            </TabGroup>


        </div>
    )
}

export default DoctorDashboard
