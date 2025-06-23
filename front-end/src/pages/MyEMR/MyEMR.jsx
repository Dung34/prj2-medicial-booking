import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyEMR = () => {
    const [emrs, setEmrs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const patient_id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchEMRs = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${apiUrl}/emr/patient/${patient_id}`, {
                    headers: { Authorization: token }
                });
                setEmrs(res.data);
            } catch (err) {
                setError('Không thể tải bệnh án.');
            } finally {
                setLoading(false);
            }
        };
        if (patient_id) fetchEMRs();
    }, [patient_id, apiUrl, token]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
            <h2 className="text-2xl font-bold mb-4">Bệnh án của tôi</h2>
            {loading ? (
                <div>Đang tải...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : emrs.length === 0 ? (
                <div>Không có bệnh án nào.</div>
            ) : (
                <div className="border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-5 gap-4 bg-gray-50 p-4 text-sm font-semibold text-gray-600">
                        <span>Mã bệnh án</span>
                        <span>Ngày tạo</span>
                        <span>Bác sĩ</span>
                        <span>Chẩn đoán</span>
                        <span>Ghi chú</span>
                    </div>
                    {emrs.map((emr) => (
                        <div key={emr._id} className="grid grid-cols-5 gap-4 items-center p-4 border-t hover:bg-gray-50">
                            <span>{emr._id}</span>
                            <span>{emr.createdAt ? new Date(emr.createdAt).toLocaleDateString() : ''}</span>
                            <span>{emr.doctor_id}</span>
                            <span>{emr.diagnosis}</span>
                            <span>{emr.note}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyEMR; 