import React, { useState, useEffect } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import axios from 'axios'
import DoctorAppointItem from '../../component/DoctorAppointItem/DoctorAppointItem'
import DoctorAppointmentDetail from '../../component/AppointmentDetail/DoctorAppointmentDetail'
import Navbar from '../../component/Navbar/Navbar'
import DoctorProfile from '../DoctorProfile/DoctorProfile'
import { CiCalendar, CiUser, CiSearch } from "react-icons/ci";
import ListEmr from '../EMR/ListEmr'
const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([])
    const [selectAppoint, setSelectAppoint] = useState({})
    const [isSelect, setIsSelect] = useState(false)
    const [successAppointment, setSuccessAppointment] = useState([])
    const [notsuccessAppointment, setNotsuccessAppointment] = useState([])

    const [status, setStatus] = useState('')
    const [patientId, setPatientId] = useState('')
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
                const doctorRes = await axios.get(`${apiUrl}/api/doctor/get-doctor/${doctorId}`)
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
    //Loc lich kham
    const filterAppointments = notsuccessAppointment.filter(appointment => {
        const matchStatus = status === '' || appointment.status === status
        const matchId = patientId === '' || appointment.patient_id === patientId.toUpperCase()
        return matchStatus && matchId
    }
    )
    const filterSuccessAppointments = successAppointment.filter(
        appointment => {
            const matchId = patientId === '' || appointment.patient_id === patientId.toUpperCase()
            return matchId
        }
    )
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
                    <Tab className='flex flex-row items-center gap-2 data-[selected]:text-black'>
                        <CiUser className='size-6' />
                        <p className='font-sans font-light text-gray-600 text-[20px] hover:text-black'>Bệnh án</p>
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
                                        <TabPanel className="">
                                            <div className='flex flex-col gap-4'>
                                                <div className='flex flex-row justify-between'>
                                                    <div className='flex flex-row items-center border border-gray-400 w-fit px-4 py-2 rounded-lg gap-2'>
                                                        <CiSearch />
                                                        <input className='focus:outline-none focus:ring-0 text-[14px] text-gray-400'
                                                            type="text" name="patientName" id="patientName" placeholder='Tìm kiếm bệnh nhân ...'
                                                            value={patientId} onChange={(e) => setPatientId(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <select value={status} onChange={(e) => setStatus(e.target.value)}
                                                            className='focus:outline-none focus:ring-0  text-[14px] border border-gray-400 px-4 py-2 rounded-md' name="status" id="status">
                                                            <option value="">-- Trạng thái --</option>
                                                            <option value="pending">Chờ xác nhận</option>
                                                            <option value="confirm">Xác nhận</option>
                                                            <option value="success">Hoàn thành</option>
                                                            <option value="cancelled">Đã hủy</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                {/* bang danh sach benh nhan */}

                                                <div className="rounded-md border">
                                                    <table className='w-full table-auto text-[14px]'>
                                                        <thead>
                                                            <tr className="border-b border-gray-400 text-left">
                                                                <th className=' py-1 px-2'>Mã số</th>
                                                                <th className=' py-1 px-2'>Bệnh nhân</th>
                                                                <th className=' py-1 px-2'>Thời gian</th>
                                                                <th className=' py-1 px-2'>Trạng thái</th>
                                                                <th className=' py-1 px-2'></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filterAppointments && filterAppointments.map((app, index) => (
                                                                <DoctorAppointItem key={app._id} appointment={app} handleClick={(e) => onClick(app)} />
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>


                                        </TabPanel>
                                        <TabPanel>
                                            <div className='flex flex-col gap-4'>
                                                <div className='flex flex-row justify-between'>
                                                    <div className='flex flex-row items-center border border-gray-400 w-fit px-4 py-2 rounded-lg gap-2'>
                                                        <CiSearch />
                                                        <input className='focus:outline-none focus:ring-0 text-[14px] text-gray-400'
                                                            type="text" name="patientName" id="patientName" placeholder='Tìm kiếm bệnh nhân ...' />
                                                    </div>
                                                    {/* <div>
                                                        <select className='focus:outline-none focus:ring-0  text-[14px] border border-gray-400 px-4 py-2 rounded-md' name="status" id="status">
                                                            <option value="">-- Trạng thái --</option>
                                                            <option value="pending">Chờ xác nhận</option>
                                                            <option value="confirm">Xác nhận</option>
                                                            <option value="success">Hoàn thành</option>
                                                            <option value="cancell">Đã hủy</option>
                                                        </select>
                                                    </div> */}
                                                </div>
                                                {/* bang danh sach benh nhan */}

                                                <div className="rounded-md border">
                                                    <table className='w-full table-auto text-[14px]'>
                                                        <thead>
                                                            <tr className="border-b border-gray-400 text-left">
                                                                <th className=' py-1 px-2'>Mã số</th>
                                                                <th className=' py-1 px-2'>Bệnh nhân</th>
                                                                <th className=' py-1 px-2'>Thời gian</th>
                                                                <th className=' py-1 px-2'>Trạng thái</th>
                                                                <th className=' py-1 px-2'></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filterSuccessAppointments && filterSuccessAppointments.map((app, index) => (
                                                                <DoctorAppointItem key={app._id} appointment={app} handleClick={(e) => onClick(app)} />
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                        </TabPanel>
                                    </TabPanels>
                                </TabGroup>
                            </div>
                            <div className='w-3/7'>
                                <p className='font-mono font-bold text-2xl'>Thông tin chi tiết</p>
                                {isSelect ? (<DoctorAppointmentDetail appointment={selectAppoint} />) : (null)}

                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <DoctorProfile doctor={doctor} />
                    </TabPanel>
                    <TabPanel>
                        <ListEmr />
                    </TabPanel>
                </TabPanels>
            </TabGroup>


        </div>
    )
}

export default DoctorDashboard
