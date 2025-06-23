import React, { useState, useEffect, useMemo } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import AppointmentItem from '../../component/AppointmentItem/AppointmentItem';
import axios from 'axios'
import AppointmentDetail from '../../component/AppointmentDetail/AppointmentDetail';
import Navbar from '../../component/Navbar/Navbar'
import DoctorManagement from './DoctorManagement'
import { Link } from 'react-router-dom'
const AppointmentDashboard = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    const [allAppointments, setAllAppointment] = useState([])
    const [pendingAppointments, setPendingAppointments] = useState([])
    const [confirmAppointments, setConfirmAppointments] = useState([])
    const [cancelledAppointments, setCancelledAppointments] = useState([])
    const [counter, setCounter] = useState([])
    const apiUrl = import.meta.env.VITE_API_URL
    const getData = async () => {
        const response = await axios.get(`${apiUrl}/appointment/`)
        const counter = await axios.get(`${apiUrl}/appointment/count/`)
        if (counter.status == 200) {
            setCounter(counter.data)
        }
        const pending = []
        const confirm = []
        const cancel = []
        if (response.status == 200) {
            setAllAppointment(response.data)
            response.data.forEach((appointment) => {
                if (appointment.status === "pending") {
                    pending.push(appointment)
                } else {
                    if (appointment.status === "confirm") {
                        confirm
                            .push(appointment)
                    } else {
                        cancel.push(appointment)
                    }
                }
            })
        }
        setPendingAppointments(pending)
        setConfirmAppointments(confirm)
        setCancelledAppointments(cancel)
        console.log(pending)
    }
    useEffect(() => {

        getData()
    }, [])
    const handleClick = (appointment) => {
        setSelectedAppointment(appointment)
        setIsOpen(true)

    }
    return (
        <div className='flex flex-col bg-white'>
            <Navbar />
            <div className="flex justify-end p-4 gap-2">
                <Link
                    to="/dashboard/not-verified-doctors"
                    className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
                >
                    Bác sĩ chưa xác thực
                </Link>
                <Link
                    to="/dashboard/register"
                    className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
                >
                    + Đăng ký bác sĩ mới
                </Link>
            </div>
            <TabGroup>
                <TabList className='flex bg-gray-200 px-4 py-2 w-fit space-x-2 rounded-md mb-4 mx-2'>
                    <Tab className='bg-gray-200 text-gray-600 data-[selected]:bg-white data-[selected]:text-black outline-0 py-2 px-2'>Tổng quan</Tab>
                    <Tab className='bg-gray-200 text-gray-600 data-[selected]:bg-white data-[selected]:text-black outline-0 py-2 px-2'>Quản lý bác sĩ</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div className='flex flex-col p-4'>
                            <div>
                                <h1 className='font-bold text-2xl'>Tổng quan</h1>
                                <p className='font-light text-gray-400'>Quản lý và phân chia lịch hẹn</p>
                            </div>

                        </div>
                        {/* filter */}
                        <div className='px-4'>
                            <input type="text" className='bg-white p-2 rounded-md mr-8' placeholder='Tìm kiếm' />
                            <button className='border shadow-md px-4 py-2 rounded-2xl hover:bg-white'>Lọc</button>
                        </div>
                        {/* Tabs */}
                        {isOpen && (
                            <AppointmentDetail
                                isOpen={isOpen}
                                onClose={() => setIsOpen(false)}
                                appointment={selectedAppointment}
                                onStatusUpdated={getData}
                            />
                        )}
                        <div className='px-4 py-2'>
                            {allAppointments && allAppointments.length > 0 ? (
                                <TabGroup>
                                    <TabList className="flex bg-gray-200 px-4 py-2 w-fit space-x-2 rounded-md mb-4">
                                        {/* 
                            {allAppointments.map(({ status }) => (
                                <Tab key={status} className="bg-gray-200 text-gray-600 data-[selected]:bg-white data-[selected]:text-black outline-0 py-2 px-2"
                                >{status === "pending" ? "Chờ xác nhận" : status === "confirm" ? "Đã xác nhận" : "Đã hủy"}</Tab>
                            ))} */}
                                        <Tab className="bg-gray-200 text-gray-600 data-[selected]:bg-white data-[selected]:text-black outline-0 py-2 px-2">
                                            Chờ xác nhận
                                        </Tab>
                                        <Tab className="bg-gray-200 text-gray-600 data-[selected]:bg-white data-[selected]:text-black outline-0 py-2 px-2">
                                            Đã xác nhận
                                        </Tab>
                                        <Tab className="bg-gray-200 text-gray-600 data-[selected]:bg-white data-[selected]:text-black outline-0 py-2 px-2">
                                            Đã hủy
                                        </Tab>
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel>
                                            <div className='border rounded-lg overflow-hidden mx-8'>
                                                <div className="grid grid-cols-6 gap-4 bg-gray-50 p-4 text-sm font-semibold text-gray-600">
                                                    <span>Mã số</span>
                                                    <span>Bác sĩ</span>
                                                    <span>Ngày</span>
                                                    <span>Bệnh nhân</span>
                                                    <span>Trạng thái</span>
                                                    <span>Chi tiết</span>
                                                </div>
                                                {pendingAppointments.map((appointment, index) => (
                                                    <AppointmentItem key={appointment._id} appointment={appointment} handleClick={() => handleClick(appointment)} />
                                                ))}
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                            <div className='border rounded-lg overflow-hidden mx-8'>
                                                <div className="grid grid-cols-6 gap-4 bg-gray-50 p-4 text-sm font-semibold text-gray-600">
                                                    <span>Mã số</span>
                                                    <span>Bác sĩ</span>
                                                    <span>Ngày</span>
                                                    <span>Bệnh nhân</span>
                                                    <span>Trạng thái</span>
                                                    <span>Chi tiết</span>
                                                </div>
                                                {confirmAppointments.map((appointment, index) => (
                                                    <AppointmentItem key={appointment._id} appointment={appointment} handleClick={() => handleClick(appointment)} />
                                                ))}
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                            <div className='border rounded-lg overflow-hidden mx-8'>
                                                <div className="grid grid-cols-6 gap-4 bg-gray-50 p-4 text-sm font-semibold text-gray-600">
                                                    <span>Mã số</span>
                                                    <span>Bác sĩ</span>
                                                    <span>Ngày</span>
                                                    <span>Bệnh nhân</span>
                                                    <span>Trạng thái</span>
                                                    <span>Chi tiết</span>
                                                </div>
                                                {cancelledAppointments.map((appointment, index) => (
                                                    <AppointmentItem key={appointment._id} appointment={appointment} handleClick={() => handleClick(appointment)} />
                                                ))}
                                            </div>
                                        </TabPanel>

                                    </TabPanels>
                                </TabGroup>
                            ) : (
                                <div className="text-center text-gray-500 py-10">Không có lịch hẹn nào</div>
                            )}

                        </div>
                        <div className='grid grid-cols-3 p-12 gap-12 w-1/2'>
                            {counter.map((counterData) => (
                                <div className='border border-gray-500 shadow-md rounded-md py-4' key={counterData._id}>
                                    <p className='px-4 font-bold text-xl '>Số {counterData._id === "patientId" ? "bệnh nhân" : counterData._id === "doctorId" ? "bác sĩ" : "lịch khám"} hiện có</p>
                                    <p className={`px-4 font-medium text-[24px] ${counterData._id === "patientId" ? "text-green-500" : counterData._id === "doctorId" ? "text-red-500" : "text-blue-500"}`}>{counterData.seq}</p>
                                </div>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <DoctorManagement />
                    </TabPanel>
                </TabPanels>
            </TabGroup>


        </div >
    )
}

export default AppointmentDashboard
