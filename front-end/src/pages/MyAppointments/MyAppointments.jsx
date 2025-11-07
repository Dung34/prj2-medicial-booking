import React, { useEffect, useState } from 'react';
import AppointmentItem from '../../component/AppointmentItem/AppointmentItem';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const { user } = useAuth();
    const token = localStorage.getItem('token');
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true);
            try {
                const patientRes = await axios.get(`${apiUrl}/api/patient/user/${user._id}`, {
                    headers: { Authorization: token }
                });
                const res = await axios.get(`${apiUrl}/appointment/patient/${patientRes.data.data._id}`, {
                    headers: { Authorization: token }
                });
                setAppointments(res.data);
            } catch (err) {
                setError('Không thể tải lịch hẹn.');
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments()
    }, [refresh]);

    const handleCancel = async (appointmentId) => {
        if (!window.confirm('Bạn có chắc muốn hủy lịch hẹn này?')) return;
        try {
            await axios.delete(`${apiUrl}/appointment/${appointmentId}`, {
                headers: { Authorization: token }
            });
            setRefresh(r => !r);
        } catch (err) {
            alert('Hủy lịch hẹn thất bại.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
            <h2 className="text-2xl font-bold mb-4">Lịch hẹn của tôi</h2>
            {loading ? (
                <div>Đang tải...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : appointments.length === 0 ? (
                <div>Không có lịch hẹn nào.</div>
            ) : (
                <div className="border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-7 gap-4 bg-gray-50 p-4 text-sm font-semibold text-gray-600">
                        <span>Mã số</span>
                        <span>Bác sĩ</span>
                        <span>Ngày</span>
                        <span>Bệnh nhân</span>
                        <span>Trạng thái</span>
                        <span>Ghi chú</span>
                        <span>Hành động</span>
                    </div>
                    {appointments.map((appointment) => (
                        <div key={appointment._id} className="grid grid-cols-7 gap-4 items-center p-4 border-t hover:bg-gray-50">
                            <span>{appointment._id}</span>
                            <span>{appointment.doctor_id}</span>
                            <span>{appointment.date} {appointment.time}</span>
                            <span>{appointment.patient_id}</span>
                            <span>{appointment.status}</span>
                            <span>{appointment.note}</span>
                            <span>
                                {appointment.status !== 'cancelled' && (
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                                        onClick={() => handleCancel(appointment._id)}
                                    >
                                        Hủy
                                    </button>
                                )}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyAppointments; 