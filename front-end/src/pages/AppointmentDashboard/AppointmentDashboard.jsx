import React, { useState, useEffect } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
// import StatusBadge from '../../component/StatusBadge/StatusBadge'
// import { Button } from '@headlessui/react'
// import { FaRegCalendarAlt } from "react-icons/fa";
// import { CiClock1 } from "react-icons/ci";
import AppointmentItem from '../../component/AppointmentItem/AppointmentItem';
import axios from 'axios'
import AppointmentDetail from '../../component/AppointmentDetail/AppointmentDetail';
// const allAppointments = [
//     {
//         status: 'pending',
//         appointments: [
//             {
//                 _id: 'APP001',
//                 patient_id: "PAT001",
//                 doctor_id: "DOC001",
//                 date: "14/4/2025",
//                 time: "9:30 - 10:30",
//                 note: "Tôi bị tiêu chảy nặng",
//                 status: 'pending',
//             },
//             {
//                 _id: 'APP002',
//                 patient_id: "PAT001",
//                 doctor_id: "DOC001",
//                 date: "14/4/2025",
//                 time: "9:30 - 10:30",
//                 note: "Tôi bị tiêu chảy nặng"
//             },
//         ],
//     },
//     {
//         status: 'confirm',
//         appointments: [
//             {
//                 _id: 'APP003',
//                 patient_id: "PAT001",
//                 doctor_id: "DOC001",
//                 date: "14/4/2025",
//                 time: "9:30 - 10:30",
//                 note: "Tôi bị tiêu chảy nặng",
//                 status: 'confirm',
//             },
//             {
//                 _id: 'APP004',
//                 patient_id: "PAT001",
//                 doctor_id: "DOC001",
//                 date: "14/4/2025",
//                 time: "9:30 - 10:30",
//                 note: "Tôi bị tiêu chảy nặng",
//                 status: 'confirm',
//             },
//         ],
//     },
//     {
//         status: 'cancelled',
//         appointments: [
//             {
//                 _id: 'APP005',
//                 patient_id: "PAT001",
//                 doctor_id: "DOC001",
//                 date: "14/4/2025",
//                 time: "9:30 - 10:30",
//                 note: "Tôi bị tiêu chảy nặng",
//                 status: 'cancelled',
//             },
//             {
//                 _id: 'APP006',
//                 patient_id: "PAT001",
//                 doctor_id: "DOC001",
//                 date: "14/4/2025",
//                 time: "9:30 - 10:30",
//                 note: "Tôi bị tiêu chảy nặng",
//                 status: 'cancelled',
//             },
//         ],
//     },
// ]


const AppointmentDashboard = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    const [allAppointments, setAllAppointment] = useState([])
    const apiUrl = import.meta.env.VITE_API_URL
    const getData = async () => {
        const response = await axios.get(`${apiUrl}/appointment/`)
        if (response.status == 200) {
            setAllAppointment(response.data)
        }
        console.log(allAppointments)
    }
    useEffect(() => {

        getData()
    }, [])
    const handleClick = (appointment) => {
        setSelectedAppointment(appointment)
        setIsOpen(true)

    }
    return (
        <div className='h-screen flex flex-col bg-gray-100'>
            <div>
                <div>
                    <h1>Tổng quan</h1>
                    <p>Quản lý và phân chia lịch hẹn</p>
                </div>

            </div>
            {/* filter */}
            <div>
                <input type="text" placeholder='Tìm kiếm' />
                <button>Lọc</button>
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
            <div>
                {allAppointments && allAppointments.length > 0 ? (
                    <TabGroup>
                        <TabList className="flex bg-gray-200 px-2 py-1 w-fit space-x-2 rounded-md mb-4">
                            {/* <Tab className="data-[selected]:bg-blue-500 data-[selected]:text-white data-[hover]:underline">Tab 1</Tab>
                        <Tab className="data-[selected]:bg-blue-500 data-[selected]:text-white data-[hover]:underline">Tab 2</Tab>
                        <Tab className="data-[selected]:bg-blue-500 data-[selected]:text-white data-[hover]:underline">Tab 3</Tab> */}
                            {allAppointments.map(({ status }) => (
                                <Tab key={status} className="bg-gray-200 text-gray-600 data-[selected]:bg-white data-[selected]:text-black outline-0 py-2 px-2"
                                >{status === "pending" ? "Chờ xác nhận" : status === "confirm" ? "Đã xác nhận" : "Đã hủy"}</Tab>
                            ))}
                        </TabList>
                        <TabPanels>
                            {allAppointments.map(({ appointments, status }) => (
                                <TabPanel key={status}>
                                    <div className='border rounded-lg overflow-hidden mx-8'>
                                        <div className="grid grid-cols-6 gap-4 bg-gray-50 p-4 text-sm font-semibold text-gray-600">
                                            <span>Mã số</span>
                                            <span>Bác sĩ</span>
                                            <span>Ngày</span>
                                            <span>Bệnh nhân</span>
                                            <span>Trạng thái</span>
                                            <span>Chi tiết</span>
                                        </div>
                                        {appointments.map((appointment, index) => (
                                            <AppointmentItem appointment={appointment} handleClick={() => handleClick(appointment)} />
                                        ))}
                                    </div>
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </TabGroup>
                ) : (
                    <div className="text-center text-gray-500 py-10">Không có lịch hẹn nào</div>
                )}

            </div>
        </div>
    )
}

export default AppointmentDashboard
