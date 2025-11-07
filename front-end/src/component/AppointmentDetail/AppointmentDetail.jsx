import React, { useState, useEffect } from 'react'
import { FaUserMd, FaUser, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaNotesMedical, FaHeartbeat } from 'react-icons/fa'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Select } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EMR from './EMR';
const AppointmentDetail = ({ isOpen, onClose, appointment, onStatusUpdated }) => {
    const navigate = useNavigate()
    if (!appointment) return null;
    const [patient, setPatient] = useState({})
    const [doctor, setDoctor] = useState({})
    const [status, setStatus] = useState(appointment.status)
    const [showNotification, setShowNotification] = useState(false)
    const [notification, setNotification] = useState('')
    const [date, setDate] = useState(appointment.date)
    const [time, setTime] = useState(appointment.time);
    const token = localStorage.getItem('token')
    const apiUrl = import.meta.env.VITE_API_URL
    useEffect(() => {
        const getData = async () => {
            const patientRes = await axios.get(`${apiUrl}/api/patient/${appointment.patient_id}`, {
                headers: {
                    "Authorization": token
                }
            })
            if (patientRes.status === 200) {
                setPatient(patientRes.data)
            }
            const doctorRes = await axios.get(`${apiUrl}/api/doctor/get-doctor/${appointment.doctor_id}`, {
                headers: {
                    "Authorization": token
                }
            })
            if (doctorRes.status === 200) {
                setDoctor(doctorRes.data)
            }

        }
        getData();
    }, [])
    const updateStatus = async (status) => {

        const response = await axios.post(`${apiUrl}/appointment/update/${appointment._id}`, {
            "status": status,
            "date": date,
            "time": time,
        })
        if (response.status == 200) {
            setNotification("Điều chỉnh thành công")
            setShowNotification(true)
            setTimeout(
                () => {
                    setNotification("")
                    setShowNotification(false)
                    onStatusUpdated()
                    onClose()
                },
                3000
            )
        }
        else {
            setNotification("Xảy ra lỗi không điều chỉnh được")
            setShowNotification(true)
            setTimeout(
                () => {
                    setNotification("")
                    setShowNotification(false)
                },
                3000
            )
        }

    }
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <DialogTitle className="text-lg font-semibold">Chi tiết lịch khám</DialogTitle>
                            <p className="text-sm text-gray-600">Mã số #{appointment._id}</p>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
                    </div>

                    <Select name="status" value={status} onChange={(e) => setStatus(e.target.value)} className="mb-4" >
                        <option value="pending" >
                            Chờ xác nhận
                        </option>
                        <option value="confirm" >
                            Xác nhận
                        </option>
                        <option value="cancelled" >
                            Hủy
                        </option>
                    </Select>

                    <div className="space-y-4 text-sm text-gray-700">
                        <div className="flex items-start gap-3">
                            <FaUser className="mt-1" />
                            <div>
                                <p className="font-semibold">Bệnh nhân</p>
                                <p>{patient.sername || ""} {patient.name}</p>
                                <p>SĐT: {patient.phoneNumber}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <FaUserMd className="mt-1" />
                            <div>
                                <p className="font-semibold">Bác sĩ</p>
                                <p>{doctor.fullname}</p>
                                <p className="text-sm text-gray-500">Email: {doctor.email}</p>
                            </div>
                        </div>

                        <hr />

                        <div className="flex items-start gap-3">
                            <FaCalendarAlt className="mt-1" />
                            <div>
                                <p className="font-semibold">Ngày</p>
                                <input
                                    type="date"
                                    id="date"
                                    value={date || ""}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="border rounded p-2"
                                />

                                {/* ✅ In giá trị ra bên dưới */}
                                <p className="mt-4 text-gray-700">
                                    Ngày bạn chọn là: <strong>{date || "Chưa chọn ngày"}</strong>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <FaClock className="mt-1" />
                            <div>
                                <p className="font-semibold">Thời gian</p>
                                <p className="mb-2">{time || "Chưa chọn"}</p>

                                <select
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="border p-2 rounded"
                                >
                                    <option value="">-- Chọn khung giờ --</option>
                                    <option value="9:30-10:30">9:30-10:30</option>
                                    <option value="10:30-11:30">10:30-11:30</option>
                                    <option value="11:30-12:30">11:30-12:30</option>
                                    <option value="13:30-14:30">13:30-14:30</option>
                                    <option value="14:30-15:30">14:30-15:30</option>
                                    <option value="15:30-16:30">15:30-16:30</option>
                                    <option value="16:30-17:30">16:30-17:30</option>
                                </select>
                            </div>
                        </div>



                        {/* <div className="flex items-start gap-3">
                            <FaHeartbeat className="mt-1" />
                            <div>
                                <p className="font-semibold">Reason for Visit</p>
                                <p>{appointment.reason || 'Follow-up consultation'}</p>
                            </div>
                        </div> */}

                        <div className="flex items-start gap-3">
                            <FaNotesMedical className="mt-1" />
                            <div>
                                <p className="font-semibold">Ghi chú</p>
                                <p>{appointment.note || 'Bệnh nhân không có ghi chú nào !!!'}</p>
                            </div>
                        </div>
                    </div>
                    {showNotification && notification ? (
                        <div className='flex items-center justify-center mt-2'><p className='text-green-500'>{notification}</p></div>
                    ) : null}
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-100"
                        >
                            Đóng
                        </button>
                        <button
                            className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
                            onClick={() => updateStatus(status)}
                        >
                            Điều chỉnh
                        </button>
                    </div>

                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default AppointmentDetail;
