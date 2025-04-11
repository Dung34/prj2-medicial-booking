import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Appointment = () => {
    const navigate = useNavigate();
    const { doctor_id } = useParams();
    const [doctor, setDoctor] = useState({});
    const [patient, setPatient] = useState({});
    const [note, setNote] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [error, setError] = useState(null);
    const patient_id = localStorage.getItem('patient_id');
    const headers = {
        Authorization: `${localStorage.getItem('token')}`,
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const doctorRes = await axios.get(`http://localhost:3000/api/doctor/${doctor_id}`, { headers: headers });
                setDoctor(doctorRes.data);
                const patientRes = await axios.get(`http://localhost:3000/api/patient/${patient_id}`, { headers: headers });
                setPatient(patientRes.data);
                console.log(doctorRes.data, patientRes.data)
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load data.');
            }
        };
        fetchData();
    }, [doctor_id, patient_id]);

    const registerAppointment = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const appointment = await axios.post(`http://localhost:3000/appointment/register`, {
                "patient_id": patient_id,
                "doctor_id": doctor_id,
                "date": date,
                "time": time,
                "note": note,
            });
            if (appointment.status === 200) {
                setRegisterSuccess(true);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
        } catch (err) {
            console.error('Error registering appointment:', err);
            setError('Failed to register appointment.');
        }
    };

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className='relative'>
            {registerSuccess && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 p-8 rounded-lg z-20 bg-amber-50">
                    <h2 className="text-2xl font-semibold mb-4">Thông báo</h2>
                    <p>Đăng ký thành công</p>
                </div>
            )}
            <h1 className='text-center text-3xl font-bold'>Lịch hẹn</h1>
            <form onSubmit={registerAppointment}>
                <div className='flex flex-col justify-center items-center'>
                    <div className='m-4 p-4 border rounded shadow-lg'>
                        <p>Đăng ký lịch khám</p>
                        <p>Bác sĩ khám : {doctor.fullname}</p>
                        <p>SĐT : {doctor.phoneNumber}</p>
                    </div>
                    <div className='m-4 p-4 border rounded shadow-lg w-[50vw] gap-2 flex flex-col'>
                        <h2 className='text-xl font-bold'>Bệnh nhân</h2>
                        <p>{patient.fullname}</p>
                        <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder='Lí do khám bệnh' className='mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500' />
                        <p>Ngày khám</p>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className='border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500 mt-1 p-2 w-fit' />
                        <p>Giờ khám</p>
                        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className='border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500 mt-1 p-2 w-fit' />
                        <div className='flex justify-center items-center'>
                            <button type="submit" className='bg-blue-500 text-white p-2 rounded'>Đăng ký</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Appointment;