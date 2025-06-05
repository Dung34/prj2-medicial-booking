import React, { useState, useEffect } from 'react'
import Navbar from '../../component/Navbar/Navbar'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
const EMRPage = () => {
    const navigate = useNavigate()
    const { appId } = useParams()
    const [appointment, setAppointment] = useState({});
    const [emr, setEmr] = useState({
        appoinment_id: appId,
    })

    const [images, setImages] = useState([])
    const [patient, setPatient] = useState({})
    const apiUrl = import.meta.env.VITE_API_URL
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/appointment/${appId}`)
                if (response.status == 200) {
                    setAppointment(response.data)
                    console.log(response.data)
                    const patientData = await axios.get(`${apiUrl}/api/patient/${response.data.patient_id}`)
                    if (patientData.status == 200) {
                        setPatient(patientData.data)
                    }
                }
            } catch (error) {

            }


        }
        getData()
    }, [])
    const handleClick = async (emr) => {
        try {
            const response = await axios.post(`${apiUrl}/emr/create/${emr.appoinment_id}`, {
                appoinment_id: emr.appoinment_id,
                symptom: emr.symptom,
                diagnose: emr.diagnose,
                treatment: emr.treatment,
            })
            if (response.status == 200) {
                alert("Đăng ký bệnh án thành công")
                const appointSuccess = await axios.post(`${apiUrl}/appointment/update/${appId}`, {
                    isSuccess: true
                })
                if (appointSuccess.status == 200) {
                    console.log("Hoàn thành ca bệnh !!")
                    setTimeout(() => {
                        navigate('/doctor/dashboard')
                    })
                }
            }
        } catch (error) {

        }
    }
    const handleMultiImagesChange = (e) => {
        const files = Array.from(e.target.files); // chuyển FileList thành Array
        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        // Gộp ảnh mới với ảnh cũ nếu cần
        setImages(prev => [...prev, ...newImages]);
    }
    //xu ly xoa anh
    const handleDelete = (id) => {
        setImages(prev => {
            const updated = prev.filter(img => img.id !== id);
            // Hủy URL để giải phóng bộ nhớ
            const deleted = prev.find(img => img.id === id);
            if (deleted) URL.revokeObjectURL(deleted.preview);
            return updated;
        });
    }
    return (
        <div>
            <Navbar />
            <div className='flex flex-col items-center'>
                <div>
                    <h1 className='font-mono text-2xl'>Hồ sơ bệnh án</h1>
                </div>
                <div className='flex flex-row gap-4'>
                    <div className='border border-gray-400 rounded-2xl px-4 py-2 h-fit'>
                        <p className='font-mono'>Họ và tên: {patient.fullname}</p>
                        <p className='font-mono'>Số điện thoại: {patient.phoneNumber}</p>
                        <p className='font-mono'>Email: {patient.email}</p>
                        <p className='font-mono'>Địa chỉ: {patient.address}</p>
                        <p className='font-mono'>Năm sinh: {patient.dateOfBirth}</p>
                        <p className='font-mono'>Căn cước công dân: {patient.identificationNumber}</p>
                        <p className='font-mono'>Giới tính: {patient.gender}</p>
                    </div>
                    <div className='w-[40vw]'>
                        <h1 className='font-mono'>Thông tin</h1>
                        <div>
                            <p className='font-mono'>Triệu chứng</p>
                            <input type="text" name='symptom' id='sysmptom' value={emr.symptom || ""} onChange={(e) => setEmr({ ...emr, symptom: e.target.value })}
                                className='border border-gray-500 rounded-md px-2 py-1 w-full' placeholder='Triệu chứng' />
                        </div>
                        <div>
                            <p className='font-mono'>Chẩn đoán</p>
                            <input type="text" name='diagnose' id='diagnose' value={emr.diagnose || ""} onChange={(e) => setEmr({ ...emr, diagnose: e.target.value })}
                                className='border border-gray-500 rounded-md px-2 py-1 w-full' placeholder='Chẩn đoán' />
                        </div>
                        <div>
                            <p className='font-mono'>Hướng điều trị</p>
                            <input type="text" name='treatment' id='treatment' value={emr.treatment || ""} onChange={(e) => setEmr({ ...emr, treatment: e.target.value })}
                                className='border border-gray-500 rounded-md px-2 py-1 w-full' placeholder='Hướng điều trị' />
                        </div>
                        <div className='flex flex-row justify-end'>
                            <button className='border border-gray-500 px-2 py-1 font-mono rounded-md mt-3 hover:bg-gray-200' onClick={(e) => handleClick(emr)}>Tạo bệnh án</button>
                        </div>
                        <div className="p-4">
                            {/* Ẩn input gốc */}
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleMultiImagesChange}
                            />

                            {/* Nút tùy chỉnh để kích hoạt input */}
                            <button
                                onClick={() => fileInputRef.current.click()}
                                className="border border-gray-500 px-2 py-1 font-mono rounded-md mt-3 hover:bg-gray-200"
                            >
                                Chọn ảnh
                            </button>

                            {images.length > 0 && (
                                <>
                                    <p className="mt-4 font-semibold">Ảnh đã chọn:</p>
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        {images.map((img, index) => (
                                            <div key={img.id} className="relative w-32 h-32 border rounded overflow-hidden">
                                                <img
                                                    src={img.preview}
                                                    alt={`Ảnh ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    onClick={() => handleDelete(img.id)}
                                                    className="absolute top-1 right-1 bg-gray-300 text-black text-xs px-1 rounded"
                                                >
                                                    X
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div>

                </div>
                <div>


                </div>
            </div>
        </div>
    )
}

export default EMRPage
