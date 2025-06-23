import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorNotVerified = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchDoctors = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await axios.get(`${apiUrl}/api/doctor/not-verified`);
            setDoctors(res.data.data);
        } catch (err) {
            setError('Không thể tải danh sách bác sĩ chưa xác thực.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleVerify = async (doctorId) => {
        setError('');
        setSuccess('');
        try {
            const res = await axios.post(`${apiUrl}/api/doctor/update/${doctorId}`, { isVerified: true });
            if (res.status === 200) {
                setSuccess('Xác thực thành công!');
                fetchDoctors();
            } else {
                setError('Xác thực thất bại.');
            }
        } catch (err) {
            setError('Xác thực thất bại.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
            <h2 className="text-2xl font-bold mb-4">Danh sách bác sĩ chưa xác thực</h2>
            {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-2 text-center">{error}</div>}
            {success && <div className="bg-green-100 text-green-700 p-2 rounded mb-2 text-center">{success}</div>}
            {loading ? (
                <div>Đang tải...</div>
            ) : doctors.length === 0 ? (
                <div>Không có bác sĩ nào cần xác thực.</div>
            ) : (
                <table className="w-full border rounded">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2">Họ tên</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Số điện thoại</th>
                            <th className="p-2">Chuyên khoa</th>
                            <th className="p-2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor) => (
                            <tr key={doctor._id} className="border-t">
                                <td className="p-2">{doctor.fullname}</td>
                                <td className="p-2">{doctor.email}</td>
                                <td className="p-2">{doctor.phoneNumber}</td>
                                <td className="p-2">{doctor.speciality_id}</td>
                                <td className="p-2">
                                    <button
                                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-800"
                                        onClick={() => handleVerify(doctor._id)}
                                    >
                                        Xác thực
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DoctorNotVerified; 