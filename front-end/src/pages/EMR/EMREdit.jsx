import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../../component/Navbar/Navbar'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const EMREdit = () => {
    const navigate = useNavigate()
    const { emrId } = useParams()
    const [appointment, setAppointment] = useState({});
    const fileInputRef = useRef(null);
    const [emr, setEmr] = useState({})
    const [images, setImages] = useState([])
    const [patient, setPatient] = useState({})
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/emr/getEmr/${emrId}`)
                if (response.status == 200) {
                    setEmr(response.data.emr)
                    setAppointment(response.data.appointment)
                    console.log(response.data)
                    const patientData = await axios.get(`http://localhost:3000/api/patient/${response.data.appointment.patient_id}`)
                    const images = await axios.get(`http://localhost:3000/emr/getEmrImage/${response.data.appointment._id}`)
                    if (patientData.status == 200) {
                        setPatient(patientData.data)
                        setImages(images.data.images)
                    }
                }
            } catch (error) {

            }


        }
        getData()
    }, [])
    const handleClick = async (emr) => {
        try {
            const response = await axios.post(`http://localhost:3000/emr/update/${emr._id}`, {
                appoinment_id: emr.appoinment_id,
                symptom: emr.symptom,
                diagnose: emr.diagnose,
                treatment: emr.treatment,
            })
            if (response.status == 200) {
                alert("Chỉnh sửa bệnh án thành công")
                // const appointSuccess = await axios.post(`http://localhost:3000/appointment/update/${appId}`, {
                //     isSuccess: true
                // })
                // if (appointSuccess.status == 200) {
                //     console.log("Hoàn thành ca bệnh !!")
                //     setTimeout(() => {
                //         navigate('/doctor/dashboard')
                //     })
                // }
            }
        } catch (error) {

        }
    }
    //Xu ly dua hinh anh len 
    const handleMultiImagesChange = (e) => {
        const files = Array.from(e.target.files); // chuyển FileList thành Array
        const newImages = files.map(file => ({
            file,
            url: URL.createObjectURL(file)
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
    // Xu ly upload anh 
    const uploadImage = async () => {
        const formData = new FormData()
        images.forEach((img) => formData.append('images', img.file))
        try {
            const res = await axios.post(`http://localhost:3000/emr/uploadImages/${emr.appoinment_id}`, formData)
            if (res.status == 200) {
                alert("Upload thanh cong ")
            }

        } catch (error) {
            console.log(error)
        }
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
                        <div className='flex flex-row justify-end gap-2'>
                            <button className='border border-gray-500 px-2 py-1 font-mono rounded-md mt-3 hover:bg-gray-200' onClick={(e) => handleClick(emr)}>Chỉnh sửa</button>
                            <button className='border border-gray-500 px-2 py-1 font-mono rounded-md mt-3 hover:bg-gray-200' onClick={(e) => navigate('/doctor/dashboard')}>Đóng</button>
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
                                            <div key={index} className="relative w-32 h-32 border rounded overflow-hidden">
                                                <img
                                                    src={img.url}
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
                            <button
                                onClick={uploadImage}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Upload
                            </button>
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

export default EMREdit
