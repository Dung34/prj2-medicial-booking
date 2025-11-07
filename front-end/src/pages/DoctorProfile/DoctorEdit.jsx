import React from 'react'
import Navbar from '../../component/Navbar/Navbar'
import { useEffect, useState } from 'react'
import { data, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import { Trash2 } from "lucide-react";
const DoctorEdit = () => {
    const [educations, setEducations] = useState([]);

    const [certifications, setCertifications] = useState([]);
    const location = useLocation()
    const navigate = useNavigate()
    const [doctor, setDoctor] = useState({})
    const { user } = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const [urlImage, setUrlImage] = useState('')
    const [imageFile, setImageFile] = useState(null)
    const apiUrl = import.meta.env.VITE_API_URL
    useEffect(() => {
        const getDoctor = async () => {
            try {
                if (user.role != 'admin') {
                    const res = await axios.get(`${apiUrl}/api/doctor/user/${user._id}`)
                    if (res.status === 200) {
                        setDoctor(res.data.data)
                    }
                    const urlRes = await axios.get(`${apiUrl}/api/doctor/profile-image?doctor_id=${res.data.data._id}`)
                    if (urlRes.status == 200) {
                        setUrlImage(urlRes.data.imageUrl)
                        console.log(urlRes.data.imageUrl)
                    }
                    const eduAndCert = await axios.get(`${apiUrl}/api/doctor/eduAndCert?doctor_id=${res.data.data._id}`)
                    if (eduAndCert.status == 200) {
                        setCertifications(eduAndCert.data.eduAndCert.certifications || [])
                        console.log(eduAndCert.data.certifications)
                        setEducations(eduAndCert.data.eduAndCert.educations || [])
                    }
                }
                setDoctor(location.state?.doctor)
                // const res = await axios.get(`${apiUrl}/api/doctor/user/${user._id}`)
                // if (res.status === 200) {
                //     setDoctor(res.data.data)
                // }
                const urlRes = await axios.get(`${apiUrl}/api/doctor/profile-image?doctor_id=${location.state?.doctor._id}`)
                if (urlRes.status == 200) {
                    setUrlImage(urlRes.data.imageUrl)
                    console.log(urlRes.data.imageUrl)
                }
                const eduAndCert = await axios.get(`${apiUrl}/api/doctor/eduAndCert?doctor_id=${location.state?.doctor._id}`)
                if (eduAndCert.status == 200) {
                    setCertifications(eduAndCert.data.eduAndCert.certifications || [])
                    console.log(eduAndCert.data.certifications)
                    setEducations(eduAndCert.data.eduAndCert.educations || [])
                }
            } catch (error) {
                console.log(error)
            }
        }
        getDoctor()
    }, [])

    const handleCancel = (e) => {
        navigate('/dashboard', {
            doctor: null
        })
    }
    const handleEdit = async (doctor) => {
        try {
            const response = await axios.post(`${apiUrl}/api/doctor/update/${doctor._id}`, {

                "fullname": doctor.fullname,
                "phoneNumber": doctor.phoneNumber,
                "email": doctor.email,
                "address": doctor.address,
            })
            if (response.status == 200) {
                console.log("done!!")
                alert("Chinh sua thanh cong !")
            }
        } catch (error) {

        }
    }
    const uploadImageProfile = async (e) => {
        e.preventDefault();
        if (!imageFile) return alert("Chưa chọn ảnh");

        const formData = new FormData();
        formData.append("file", imageFile); // tên này phải khớp với backend

        try {
            const res = await axios.post(`http://localhost:3000/api/doctor/profileEdit?doctor_id=${doctor._id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },

            });
            if (res.status == 200) {
                alert("Upload thành công!");
                setUrlImage(res.data.url)
                console.log(res.data);
            }
            else {
                console.log(res.data)
            }
        } catch (error) {
            console.error("Lỗi upload ảnh:", error);
        }
    }


    // State để thêm mới
    const [newEdu, setNewEdu] = useState({ name: "", year: "" });
    const [newCert, setNewCert] = useState({ title: "", time: "" });

    const removeItem = (type, index) => {
        if (type === "education") {
            setEducations((prev) => prev.filter((_, i) => i !== index));
        } else {
            setCertifications((prev) => prev.filter((_, i) => i !== index));
        }
    };

    const addEducation = () => {
        if (newEdu.name && newEdu.year) {
            setEducations([...educations, newEdu]);
            setNewEdu({ name: "", year: "" });
        }
    };

    const addCert = () => {
        if (newCert.title && newCert.time) {
            setCertifications([...certifications, newCert]);
            setNewCert({ title: "", time: "" });
        }
    };
    const saveEduanCert = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/doctor/eduAndCert?doctor_id=${doctor._id}`, {
                "doctor_id": doctor._id,
                'certifications': certifications,
                'educations': educations,
            })
            if (response.status == 200) {
                alert("Lưu thông tin thày công !!")
            }
        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <div >
            <Navbar />
            <div className='flex flex-col p-4'>
                <h1 className='text-2xl font-bold'>Thông tin bác sĩ</h1>
                <p className='text-gray-500'>Cập nhật thông tin bác sĩ</p>
            </div>
            <div className='flex flex-col justify-center items-center gap-4'>
                <div className='flex flex-row gap-4'>
                    {/* container ben trai */}
                    <div className='border-2 border-gray-300 rounded-md p-4 flex flex-col gap-4 items-center '>
                        <h1 className='text-black font-sans font-medium'>Ảnh hồ sơ</h1>
                        <div>
                            <img className='w-30 h-30 rounded-full' src={urlImage || null} alt="" />
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                setImageFile(e.target.files[0])
                                setUrlImage(URL.createObjectURL(e.target.files[0]))
                            }}
                            className="text-sm"
                        />
                        <div className='flex flex-row gap-4'>
                            <button className='bg-black text-white px-4 py-2 rounded-md'>Chọn ảnh</button>
                            <button onClick={uploadImageProfile} className='bg-gray-100 border-2 border-gray-400 text-black hover:bg-gray-200 px-4 py-2 rounded-md'>Xác nhận</button>
                        </div>
                    </div>
                    {/* container ben phai */}
                    <div className='border-2 border-gray-300 rounded-md p-4 sm:w-[50vw]'>
                        <h1 className='text-black font-sans font-medium'>Thông tin cá nhân</h1>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='flex flex-col gap-2'>
                                <label className='text-black font-sans font-medium' htmlFor="name">Họ và tên</label>
                                <input onChange={(e) => setDoctor({ ...doctor, fullname: e.target.value })}
                                    className='border-2 border-gray-300 rounded-md p-2' type="text" name="name" id="name" value={doctor.fullname || ""} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-black font-sans font-medium' htmlFor="email">Email</label>
                                <input onChange={(e) => setDoctor({ ...doctor, email: e.target.value })}
                                    className='border-2 border-gray-300 rounded-md p-2' type="text" name="email" id="email" value={doctor.email || ""} />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='flex flex-col gap-2'>
                                <label className='text-black font-sans font-medium' htmlFor="phone">Số điện thoại</label>
                                <input onChange={(e) => setDoctor({ ...doctor, phoneNumber: e.target.value })}
                                    className='border-2 border-gray-300 rounded-md p-2' type="text" name="phone" id="phone" value={doctor.phoneNumber || ""} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-black font-sans font-medium' htmlFor="address">Chuyên khoa</label>
                                <input onChange={(e) => setDoctor({ ...doctor, speciality_id: e.target.value })}
                                    className='border-2 border-gray-300 rounded-md p-2' type="text" name="address" id="address" value={doctor.speciality_id || ""} />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='text-black font-sans font-medium' htmlFor="address">Địa chỉ</label>
                            <input onChange={(e) => setDoctor({ ...doctor, address: e.target.value })}
                                className='border-2 border-gray-300 rounded-md p-2' type="text" name="address" id='address' value={doctor.address || ""} />
                        </div>
                        <div className='flex flex-row justify-end gap-4 mt-4'>
                            <button onClick={(e) => handleEdit(doctor)} className='bg-black text-white px-4 py-2 rounded-md'>Cập nhật</button>
                            <button onClick={handleCancel} className='bg-gray-100 border border-gray-400 text-black hover:bg-gray-200 px-4 py-2 rounded-md'>Hủy bỏ</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="border rounded-md p-6 bg-white max-w-6xl mx-auto mt-6">
                    <h2 className="text-2xl font-bold text-black">Thông tin bổ sung</h2>
                    <p className="text-gray-500 mb-6">Quản lý thông tin và chứng chỉ bác sĩ bổ sung</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Education Section */}
                        <div>
                            <h3 className="text-lg font-semibold text-black mb-4">Trình độ học vấn</h3>
                            <div className="flex flex-col gap-4">
                                {Array.isArray(educations) && educations.map((item, index) => (
                                    <div key={index} className="border rounded-md p-4 flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-black">{item.name}</p>
                                            <p className="text-gray-600">{item.year}</p>
                                        </div>
                                        <button onClick={() => removeItem("education", index)} className="text-gray-500 hover:text-red-600">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}

                                {/* Form thêm Education */}
                                <div className="flex flex-col gap-2">
                                    <input
                                        type="text"
                                        placeholder="Học vấn"
                                        className="border rounded-md p-2"
                                        value={newEdu.name || ""}
                                        onChange={(e) => setNewEdu({ ...newEdu, name: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Detail (e.g., MD, 2005)"
                                        className="border rounded-md p-2"
                                        value={newEdu.year || ""}
                                        onChange={(e) => setNewEdu({ ...newEdu, year: e.target.value })}
                                    />
                                    <button onClick={addEducation} className="mt-2 border px-4 py-2 rounded hover:bg-gray-100 text-sm w-fit">
                                        Add Education
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Affiliation Section */}
                        <div>
                            <h3 className="text-lg font-semibold text-black mb-4">Chứng chỉ chuyên môn</h3>
                            <div className="flex flex-col gap-4">
                                {Array.isArray(certifications) && certifications.map((item, index) => (
                                    <div key={index} className="border rounded-md p-4 flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-black">{item.title}</p>
                                            <p className="text-gray-600">{item.time}</p>
                                        </div>
                                        <button onClick={() => removeItem("affiliation", index)} className="text-gray-500 hover:text-red-600">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}

                                {/* Form thêm Affiliation */}
                                <div className="flex flex-col gap-2">
                                    <input
                                        type="text"
                                        placeholder="Tên / loại"
                                        className="border rounded-md p-2"
                                        value={newCert.title || ""}
                                        onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Detail (e.g., Physician, 2010-Present)"
                                        className="border rounded-md p-2"
                                        value={newCert.time || ""}
                                        onChange={(e) => setNewCert({ ...newCert, time: e.target.value })}
                                    />
                                    <button onClick={addCert} className="mt-2 border px-4 py-2 rounded hover:bg-gray-100 text-sm w-fit">
                                        Thêm chứng chỉ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Save button */}
                    <div className="flex justify-end mt-6">
                        <button onClick={saveEduanCert}
                            className="bg-black text-white px-5 py-2 rounded-md hover:opacity-90 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Lưu thay đổi
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DoctorEdit
