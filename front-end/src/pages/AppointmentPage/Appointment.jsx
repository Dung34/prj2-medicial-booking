import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Appointment = () => {
    const navigate = useNavigate();
    const { doctor_id } = useParams();
    const [doctor, setDoctor] = useState({});
    const [patient, setPatient] = useState({});
    // const [note, setNote] = useState('');
    // const [date, setDate] = useState('');
    // const [time, setTime] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState(false);
    // const [error, setError] = useState(null);
    const { user } = useAuth();
    const headers = {
        Authorization: `${localStorage.getItem('token')}`,
    };

    useEffect(() => {
        const fetchData = async (doctor_id) => {
            try {

                const doctorRes = await axios.get(`http://localhost:3000/api/doctor/get-doctor/${doctor_id}`, { headers: headers });
                const patientRes = await axios.get(`http://localhost:3000/api/patient/user/${user._id}`, { headers: headers });
                if (doctorRes.status !== 200) {
                    throw new Error('Xảy ra lỗi khi tải dữ liệu bác sĩ !!');

                }
                if (patientRes.status !== 200) {
                    throw new Error('Xảy ra lỗi khi tải dữ liệu bệnh nhân !!');

                }
                setDoctor(doctorRes.data);
                setPatient(patientRes.data.data);
                console.log(patientRes.data.data);

            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau !!!');
            }
        };
        fetchData(doctor_id);
    }, [doctor_id]);

    const registerAppointment = async (e) => {

        e.preventDefault(); // Prevent default form submission
        try {
            const appointment = await axios.post(`http://localhost:3000/appointment/register`, {
                "patient_id": patient._id,
                "doctor_id": doctor_id,
                "date": date,
                "time": time,
                "note": note,
            });
            if (appointment.status === 200) {
                setRegisterSuccess(true);
                setTimeout(() => {
                    setDate('');
                    setTime('');
                    setNote('');
                    setDoctor({});
                    setRegisterSuccess(false);
                    navigate('/');
                }, 3000);
            }
        } catch (err) {
            console.log(err)
        }
    };

    // if (error) {
    //     return <div className="text-red-500">Error: {error}</div>;
    // }

    const [note, setNote] = useState("");
    const location = useLocation()
    const [date, setDate] = useState(location.state.date || "12/4/2025")
    const [time, setTime] = useState(location.state.time || "10:30 - 11:30")
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg space-y-6">
            {/* Doctor Info */}
            <div className="flex items-start space-x-4">
                <img
                    src="/doctor.jpg"
                    alt="Doctor"
                    className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                    <h3 className="text-sm text-gray-500 font-semibold uppercase">ĐẶT LỊCH KHÁM</h3>
                    <h2 className="text-blue-900 font-bold text-lg">Bác sĩ {doctor.fullname}</h2>
                    <p className="text-yellow-600 font-semibold mt-1">{time} ngày {date}</p>
                    <p className="text-gray-600 mt-1">
                        📍 Phòng khám Spinetech Clinic, 257 Giải Phóng, Đống Đa, Hà Nội
                    </p>
                </div>
            </div>

            {/* Lý do khám */}
            <div>
                <label className="block font-semibold text-gray-700 mb-1">Lý do khám</label>
                <textarea
                    rows="3"
                    className="w-full border rounded p-2 text-sm"
                    placeholder="Nhập lý do khám..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </div>

            {/* Phương thức thanh toán */}
            <div>
                <p className="text-blue-700 font-semibold mb-2">Hình thức thanh toán</p>
                <label className="flex items-center space-x-2 text-sm">
                    <input type="radio" checked readOnly className="form-radio" />
                    <span>Thanh toán sau tại cơ sở y tế</span>
                </label>
            </div>

            {/* Bảng giá */}
            <div className="bg-gray-100 p-4 rounded text-sm">
                <div className="flex justify-between mb-1">
                    <span>Giá khám</span>
                    <span>500.000đ</span>
                </div>
                <div className="flex justify-between mb-1">
                    <span>Phí đặt lịch</span>
                    <span className="text-green-600">Miễn phí</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                    <span>Tổng cộng</span>
                    <span className="text-red-600">500.000đ</span>
                </div>
            </div>

            {/* Lưu ý */}
            <div className="bg-blue-100 p-4 rounded text-sm text-gray-700">
                <strong className="block mb-1">LƯU Ý</strong>
                <ul className="list-disc list-inside space-y-1">

                    <li>Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước khi ấn "Xác nhận"</li>
                </ul>
            </div>

            {/* Nút xác nhận */}
            <button onClick={registerAppointment}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 rounded">
                Xác nhận đặt khám
            </button>
            {registerSuccess && (
                <div className="bg-green-100 text-green-700 p-4 rounded">
                    <p className="font-semibold">Đặt lịch khám thành công!</p>
                    <p>Chúng tôi sẽ liên hệ với bạn để xác nhận lịch khám.</p>
                </div>
            )}
            {/* Điều khoản sử dụng */}
            <p className="text-center text-xs text-gray-500 mt-2">
                Bằng việc xác nhận đặt khám, bạn đã hoàn toàn đồng ý với{" "}
                <a href="#" className="text-blue-500 underline">Điều khoản sử dụng</a> dịch vụ của chúng tôi.
            </p>
        </div>
    );
};

export default Appointment;