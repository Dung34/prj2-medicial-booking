import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CiMail, CiPhone, CiMap, CiEdit, CiCalendar, CiUser } from "react-icons/ci";
import { FaUserGraduate } from "react-icons/fa6";
import { GrCertificate } from "react-icons/gr";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
const languages = [
    "Tiếng Anh", "Tiếng Pháp", "Tiếng Trung"
]
const educations = [
    {
        "title": "Bác sĩ nội trú Bệnh viện Bạch Mai",
        "time": "2003-2006"
    },
    {
        "title": "Giảng viên trường Đại học Y Hà Nội",
        "time": "2006-2016"
    },
    {
        "title": "Trưởng khoa Nội tổng hợp - Bệnh viện Đại học Y",
        "time": "2016-2020"
    },
    {
        "title": "Chuyên gia tư vấn y khoa tại Bộ Y tế",
        "time": "2020-nay"
    }
]
const certifications = [
    {
        "id": 1,
        "tên": "Bằng Bác sĩ Đa khoa",
        "tên cơ quan cấp": "Đại học Y Hà Nội",
        "năm cấp": 2003
    },
    {
        "id": 2,
        "tên": "Chứng chỉ Nội trú chuyên ngành Nội tổng hợp",
        "tên cơ quan cấp": "Bệnh viện Bạch Mai",
        "năm cấp": 2006
    },
    {
        "id": 3,
        "tên": "Chứng chỉ hành nghề khám bệnh, chữa bệnh",
        "tên cơ quan cấp": "Bộ Y tế",
        "năm cấp": 2007
    },
    {
        "id": 4,
        "tên": "Chứng chỉ đào tạo liên tục về tim mạch",
        "tên cơ quan cấp": "Trường Đại học Y Dược TP.HCM",
        "năm cấp": 2015
    },
    {
        "id": 5,
        "tên": "Chứng chỉ đào tạo quản lý bệnh viện",
        "tên cơ quan cấp": "Trường Đại học Y tế Công cộng",
        "năm cấp": 2019
    }
]
const todayPerformance = {
    "todayAppointments": 8,
    "isSuccess": 3,
    "newPatient": 2
}
const scheduleData = {
    workingHours: [
        { day: "Thứ hai", time: "08:00 - 17:00" },
        { day: "Thứ ba", time: "08:00 - 17:00" },
        { day: "Thứ tư", time: "08:00 - 17:00" },
        { day: "Thứ năm", time: "08:00 - 17:00" },
        { day: "Thứ sáu", time: "08:00 - 15:00" },
        { day: "Thứ bảy", time: "Off" },
        { day: "Chủ nhật", time: "Off" },
    ],
    upcomingTimeOff: [
        {
            title: "Kỷ niệm ngày cưới",
            startDate: "May 15, 2025",
            endDate: "May 20, 2025",
        },
        {
            title: "Kỳ nghỉ hè",
            startDate: "Jul 10, 2025",
            endDate: "Jul 24, 2025",
        },
    ],
    lastUpdated: "April 10, 2025",
};
const DoctorProfile = () => {
    const [doctor, setDoctor] = useState({})
    const [error, setError] = useState('')
    const apiUrl = import.meta.env.VITE_API_URL
    const doctor_id = localStorage.getItem('id')
    const token = localStorage.getItem('token')
    useEffect(() => {

        const getData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/doctor/get-doctor/${doctor_id}`, {
                    headers: {
                        Authorization: token
                    }
                })
                if (response.status == 200) {
                    setDoctor({})
                    setDoctor(response.data)
                    console.log(response.data)
                }
                else {
                    setDoctor({})
                    setError('')
                    setError('Lỗi khi cố gắng lấy dữ liệu !!!')
                    console.log(error)
                }
            } catch (error) {
                console.log(error)
            }

        }
        getData()
    }, [doctor_id])
    return (
        <div>
            <div className='px-[10vw] flex flex-row gap-10'>

                <div className='w-[40%]'>
                    <h2 className='font-sans text-4xl font-bold text-black p-2'>Hồ sơ bác sĩ</h2>
                    <div>
                        <div className='border border-gray-400 py-4 px-10 rounded-2xl'>
                            <div className='flex flex-row justify-between'>
                                <p className='p-0 m-0 font-sans text-2xl text-black'>Thông tin cá nhân</p>
                                <button ><CiEdit className='size-6 hover:text-green-600' /></button>
                            </div>


                            <div className='flex flex-row justify-start items-center gap-8 mt-4'>
                                <div><img className='size-20 rounded-full' src={'/Doctors/doctorProfile1.png'} alt={doctor.fullname} /></div>
                                <div>
                                    <h2 className='p-0 m-0 font-sans text-black text-xl'>Bác sĩ {doctor.fullname}</h2>
                                    <p className='p-0 m-0 font-sans text-gray-400 text-[16px]'>Chuyên ngành</p>
                                </div>
                            </div>
                            <div className='flex flex-row gap-4 justify-start items-center mt-4'>
                                <CiMail className='size-8' />
                                <div className='flex flex-col gap-0'>
                                    <p className='font-sans font-medium text-[20px] p-0 m-0'>Email</p>
                                    <p className='font-sans font-light text-[16px] text-gray-400 p-0 m-0'>{doctor.email}</p></div>
                            </div>
                            <div className='flex flex-row gap-4 justify-start items-center mt-2'>
                                <CiPhone className='size-8' />
                                <div className='flex flex-col gap-0' >
                                    <p className='font-sans font-medium text-[20px] p-0 m-0'>Số điện thoại</p>
                                    <p className='font-sans font-light text-[16px] text-gray-400 p-0 m-0'>{doctor.phoneNumber}</p>
                                </div>
                            </div>
                            <div className='flex flex-row gap-4 justify-start items-center mt-4'>
                                <CiMap className='size-8' />
                                <div className='flex flex-col gap-0'>
                                    <p className='font-sans font-medium text-[20px] p-0 m-0'>Địa chỉ</p>
                                    <p className='font-sans font-light text-[16px] text-gray-400 p-0 m-0'>{doctor.address}</p></div>
                            </div>
                            <hr className='my-2' />
                            <div>
                                <p className='font-sans font-medium text-xl p-0 m-2'>Ngoại ngữ</p>
                                <div className='flex flex-row gap-2'>
                                    {languages.map((language, index) => (
                                        <p className='border rounded-2xl px-4 py-1 m-0 font-sans text-[16px] text-gray-400 ' key={index}>{language}</p>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* Cac loai bang cap  */}
                    <div className='border border-gray-400 py-4 px-10 rounded-2xl mt-4' >
                        <h1 className='p-0 m-0 font-sans font-medium text-2xl text-black mb-2'>Bằng cấp và kinh nghiệm làm việc</h1>
                        <div>
                            <div className='flex flex-row gap-2 justify-start items-center'>
                                <FaUserGraduate className='size-4 text-green-600' />
                                <p className='font-sans font-medium text-[20px] p-0 m-0'>Trình độ học vấn</p>
                            </div>
                            <div className='flex flex-col gap-2 items-start my-4'>{educations.map((education, index) => (
                                <div className='' key={education.time + index}>
                                    <p className='font-sans text-xl'>{education.title}</p>
                                    <p className='font-sans text-[16px] font-light text-gray-400'>{education.time}</p>
                                </div>
                            ))}</div>
                            <hr />
                        </div>

                        <div>
                            <div className='flex flex-row gap-2 items-center justify-start mt-2'>
                                <GrCertificate className='size-4 text-green-600' />
                                <p className='font-sans font-medium text-[20px] p-0 my-2'>Bằng cấp, chứng chỉ</p>
                            </div>
                            <div className='flex flex-col items-start gap-2'>{certifications.map((certification) => (
                                <div key={certification.tên}>
                                    <p className='font-sans text-xl'>{certification.tên}</p>
                                    <p className='font-sans text-[16px] font-light text-gray-400'>{certification['tên cơ quan cấp']}, {certification['năm cấp']}</p>
                                </div>
                            ))}</div>
                        </div>

                    </div>
                </div>
                <div className='w-[50%]'>
                    <div className='border border-gray-400 p-4 m-4 rounded-2xl w-full'>
                        <p className='font-sans font-bold text-2xl mb-4 mx-2' >Tổng quan hiệu suất</p>
                        <TabGroup>
                            <TabList className="flex bg-gray-200 px-4 py-2 w-fit space-x-2 rounded-md mb-4">
                                <Tab className="bg-gray-200 text-gray-600 data-[selected]:bg-white data-[selected]:text-black outline-0 py-2 px-2">Hôm nay</Tab>
                                <Tab className="bg-gray-200 text-gray-600 data-[selected]:bg-white data-[selected]:text-black outline-0 py-2 px-2">Tuần này</Tab>
                                <Tab className="bg-gray-200 text-gray-600 data-[selected]:bg-white data-[selected]:text-black outline-0 py-2 px-2">Tháng này</Tab>
                            </TabList>
                            <TabPanels >
                                <TabPanel className='grid grid-cols-2 gap-6'>
                                    <div className='border border-gray-400 px-4 py-2 rounded-2xl'>
                                        <div className='flex flex-row gap-2'
                                        ><CiCalendar className='size-6 text-green-400' />
                                            <p className='font-sans font-medium text-[16px]'>Tổng số lịch khám trong ngày</p></div>
                                        <p className='font-sans font-medium text-[20px]'>{todayPerformance.todayAppointments}</p>
                                        <p className='font-sans font-light text-gray-400 text-[16px]'>{todayPerformance.isSuccess} lịch khám đã hoàn thành</p>
                                    </div>
                                    <div className='border border-gray-400 px-4 py-2 rounded-2xl'>
                                        <div className='flex flex-row gap-2'>
                                            <CiUser className='size-6 text-green-400' />
                                            <p className='font-sans font-medium text-[16px]'>Số bệnh nhân mới</p>
                                        </div>
                                        <p className='font-sans font-medium text-[20px]'>{todayPerformance.newPatient}</p>
                                    </div>
                                </TabPanel>
                                <TabPanel>Tuần này</TabPanel>
                                <TabPanel>Tháng này</TabPanel>
                            </TabPanels>
                        </TabGroup>
                    </div>
                    <div className='border border-gray-400 p-4 m-4 rounded-2xl w-full'>
                        <div className='flex flex-row justify-between'>
                            <p className='font-sans font-medium text-2xl'>Lịch trình</p>
                            <button className='px-4 py-2 text-white bg-black rounded-2xl'>+ Đăng ký ngày nghỉ</button>
                        </div>
                        <div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">Lịch làm việc hàng tuần</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                                    {scheduleData.workingHours.map((item) => (
                                        <div
                                            key={item.day}
                                            className="border p-3 rounded-lg text-center text-sm text-gray-700"
                                        >
                                            <div className="font-medium">{item.day}</div>
                                            <div className={item.time === "Off" ? "text-red-500" : ""}>{item.time}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">Lịch nghỉ sắp tới</h3>
                                <div className="space-y-3">
                                    {scheduleData.upcomingTimeOff.map((item, index) => (
                                        <div
                                            key={index}
                                            className="border p-4 rounded-lg bg-gray-50 flex items-center gap-3"
                                        >
                                            <CiCalendar className="text-gray-500" size={20} />
                                            <div>
                                                <div className="font-medium">{item.title}</div>
                                                <div className="text-sm text-gray-500">{item.startDate} – {item.endDate}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile
