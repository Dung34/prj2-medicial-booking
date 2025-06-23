import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { CiUser, CiPhone, CiHeart } from "react-icons/ci";
import DateOfBirthPicker from '../../component/ui/DateOfBirthPicker';
import { useAuth } from '../../context/AuthContext';

const EditPatientInfo = () => {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    const { user, patient } = useAuth();

    const [sername, setSername] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState();
    const [identificationNumber, setIdentificationNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [addressCity, setAddressCity] = useState('');
    const [addressDistrict, setAddressDistrict] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactPhoneNumber, setContactPhoneNumber] = useState('');
    const [contactRelationship, setContactRelationship] = useState('');
    const [gender, setGender] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [height, setHeight] = useState('');
    const [allergy, setAllergy] = useState('');
    const [currentMedical, setCurrentMedical] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch patient info by user._id
        const fetchPatient = async () => {
            try {
                const res = await axios.get(`${apiUrl}/api/patient/user/${user._id}`);
                if (res.status === 200 && res.data.data) {
                    const p = res.data.data;
                    setSername(p.sername || '');
                    setName(p.name || '');
                    setDob(p.dateOfBirth || '');
                    setIdentificationNumber(p.identificationNumber || '');
                    setPhoneNumber(p.phoneNumber || '');
                    setAddress(p.address || '');
                    setAddressCity(p.addressCity || '');
                    setAddressDistrict(p.addressDistrict || '');
                    setZipCode(p.zipCode || '');
                    setContactName(p.contactName || '');
                    setContactPhoneNumber(p.contactPhoneNumber || '');
                    setContactRelationship(p.contactRelationship || '');
                    setGender(p.gender || '');
                    setBloodType(p.bloodType || '');
                    setHeight(p.height || '');
                    setAllergy(p.allergy || '');
                    setCurrentMedical(p.currentMedical || '');
                    setMedicalHistory(p.medicalHistory || '');
                }
            } catch (err) {
                alert('Không thể tải thông tin bệnh nhân.');
            } finally {
                setLoading(false);
            }
        };
        if (user && user._id) fetchPatient();
    }, [user, apiUrl]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // Get patient id from patient context or fetch
            let patientId = patient?._id;
            if (!patientId) {
                // Fetch patient by user id
                const res = await axios.get(`${apiUrl}/api/patient/user/${user._id}`);
                patientId = res.data.data?._id;
            }
            const response = await axios.put(`${apiUrl}/api/patient/${patientId}`, {
                sername,
                name,
                phoneNumber,
                dateOfBirth: dob,
                gender,
                identificationNumber,
                bloodType,
                address,
                addressCity,
                addressDistrict,
                contactName,
                contactPhoneNumber,
                contactRelationship,
                height,
                allergy,
                currentMedical,
                medicalHistory,
                zipCode
            });
            if (response.status === 200) {
                alert('Cập nhật thông tin thành công!');
                navigate('/');
            }
        } catch (error) {
            alert('Cập nhật thất bại.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Đang tải...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-amber-50 flex flex-row items-center">
                        <FaArrowLeft className="w-4 h-4 mr-2" />
                        Quay lại
                    </button>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cập nhật thông tin bệnh nhân</h1>
                        <p className="text-gray-600">Cập nhật thông tin y tế của bạn để được chăm sóc tốt hơn</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className='bg-white px-4 py-6 shadow-md rounded-md'>
                        <div >
                            <div className="flex items-center gap-2 text-blue-700 font-sans text-xl">
                                <CiUser className="w-5 h-5" />
                                Thông tin cá nhân
                            </div>
                            <p className='font-sans font-[14px]'>Cập nhật thông tin cá nhân cơ bản của bạn</p>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2 flex flex-col">
                                    <label htmlFor="firstName">Họ *</label>
                                    <input id="firstName" placeholder="Họ"
                                        value={sername} onChange={(e) => setSername(e.target.value)}
                                        className='w-full border px-2 py-1 border-gray-300 rounded-md' required />
                                </div>
                                <div className="space-y-2 flex flex-col">
                                    <label htmlFor="lastName">Tên *</label>
                                    <input id="lastName" placeholder="Tên"
                                        value={name} onChange={(e) => setName(e.target.value)}
                                        className='w-full border px-2 py-1 border-gray-300 rounded-md' required />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <DateOfBirthPicker value={dob} onChange={setDob}></DateOfBirthPicker>
                                    <p>{dob}</p>
                                </div>
                                <div className="space-y-2 flex flex-col">
                                    <label htmlFor="gender">Giới tính</label>
                                    <select
                                        id="gender"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="w-full border px-2 py-1 border-gray-300 rounded-md"
                                    >
                                        <option value="" disabled>Chọn giới tính</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2 flex flex-col">
                                <label className='' htmlFor="ssn">Số căn cước công dân</label>
                                <input id="ssn" placeholder="Số căn cước công dân"
                                    value={identificationNumber} onChange={(e) => setIdentificationNumber(e.target.value)}
                                    className='w-full border px-2 py-1 border-gray-300 rounded-md' />
                            </div>
                        </div>
                    </div>
                    {/* Contact Information */}
                    <div className='bg-white px-4 py-6 shadow-md rounded-md'>
                        <div>
                            <div className="flex items-center gap-2 text-green-700 font-sans text-xl">
                                <CiPhone className="w-5 h-5" />
                                Thông tin liên lạc
                            </div>
                            <p className='font-sans font-[14px]'>Cập nhật thông tin liên lạc và địa chỉ của bạn</p>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1  gap-4">
                                <div className="space-y-2 flex flex-col">
                                    <label htmlFor="phone">Số điện thoại *</label>
                                    <input id="phone" type="tel" placeholder="Số điện thoại"
                                        value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                                        className='w-full border px-2 py-1 border-gray-300 rounded-md' required />
                                </div>
                            </div>
                            <div className="space-y-2 flex flex-col">
                                <label htmlFor="address">Địa chỉ nơi cư trú *</label>
                                <input id="address" placeholder="Địa chỉ nơi cư trú"
                                    value={address} onChange={(e) => setAddress(e.target.value)}
                                    className='w-full border px-2 py-1 border-gray-300 rounded-md' required />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2 flex flex-col">
                                    <label htmlFor="city">Thành phố / Tỉnh *</label>
                                    <input id="city" placeholder="Thành phố / Tỉnh"
                                        value={addressCity} onChange={(e) => setAddressCity(e.target.value)}
                                        className='w-full border px-2 py-1 border-gray-300 rounded-md' required />
                                </div>
                                <div className="space-y-2 flex flex-col">
                                    <label htmlFor="state">Quận / Huyện *</label>
                                    <input id="state" placeholder="Quận / Huyện"
                                        value={addressDistrict} onChange={(e) => setAddressDistrict(e.target.value)}
                                        className='w-full border px-2 py-1 border-gray-300 rounded-md' required />
                                </div>
                                <div className="space-y-2 flex flex-col">
                                    <label htmlFor="zipCode">ZIP Code (nếu có)</label>
                                    <input id="zipCode" placeholder="ZIP Code"
                                        value={zipCode} onChange={(e) => setZipCode(e.target.value)}
                                        className='w-full border px-2 py-1 border-gray-300 rounded-md' />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Emergency Contact */}
                    <div className='bg-white px-4 py-6 shadow-md rounded-md'>
                        <div>
                            <div className="flex items-center gap-2 text-red-700 font-sans text-xl">
                                <CiHeart className="w-5 h-5" />
                                Liên hệ khẩn cấp
                            </div>
                            <p className='font-sans font-[14px]'>Người liên hệ trong trường hợp khẩn cấp</p>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2 flex flex-col">
                                    <label htmlFor="contactName">Tên người liên hệ *</label>
                                    <input id="contactName" placeholder="Tên người liên hệ"
                                        value={contactName} onChange={(e) => setContactName(e.target.value)}
                                        className='w-full border px-2 py-1 border-gray-300 rounded-md' required />
                                </div>
                                <div className="space-y-2 flex flex-col">
                                    <label htmlFor="contactPhone">Số điện thoại *</label>
                                    <input id="contactPhone" placeholder="Số điện thoại"
                                        value={contactPhoneNumber} onChange={(e) => setContactPhoneNumber(e.target.value)}
                                        className='w-full border px-2 py-1 border-gray-300 rounded-md' required />
                                </div>
                                <div className="space-y-2 flex flex-col">
                                    <label htmlFor="contactRelationship">Mối quan hệ *</label>
                                    <input id="contactRelationship" placeholder="Mối quan hệ"
                                        value={contactRelationship} onChange={(e) => setContactRelationship(e.target.value)}
                                        className='w-full border px-2 py-1 border-gray-300 rounded-md' required />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Medical Information */}
                    <div className='bg-white px-4 py-6 shadow-md rounded-md'>
                        <div>
                            <div className="flex items-center gap-2 text-purple-700 font-sans text-xl">
                                <span className="material-icons">favorite</span>
                                Thông tin y tế
                            </div>
                            <p className='font-sans font-[14px]'>Cập nhật thông tin y tế của bạn</p>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2 flex flex-col">
                                    <label htmlFor="bloodType">Nhóm máu</label>
                                    <input id="bloodType" placeholder="Nhóm máu"
                                        value={bloodType} onChange={(e) => setBloodType(e.target.value)}
                                        className='w-full border px-2 py-1 border-gray-300 rounded-md' />
                                </div>
                                <div className="space-y-2 flex flex-col">
                                    <label htmlFor="height">Chiều cao (cm)</label>
                                    <input id="height" placeholder="Chiều cao"
                                        value={height} onChange={(e) => setHeight(e.target.value)}
                                        className='w-full border px-2 py-1 border-gray-300 rounded-md' />
                                </div>
                            </div>
                            <div className="space-y-2 flex flex-col">
                                <label htmlFor="allergy">Dị ứng</label>
                                <input id="allergy" placeholder="Dị ứng"
                                    value={allergy} onChange={(e) => setAllergy(e.target.value)}
                                    className='w-full border px-2 py-1 border-gray-300 rounded-md' />
                            </div>
                            <div className="space-y-2 flex flex-col">
                                <label htmlFor="currentMedical">Bệnh hiện tại</label>
                                <input id="currentMedical" placeholder="Bệnh hiện tại"
                                    value={currentMedical} onChange={(e) => setCurrentMedical(e.target.value)}
                                    className='w-full border px-2 py-1 border-gray-300 rounded-md' />
                            </div>
                            <div className="space-y-2 flex flex-col">
                                <label htmlFor="medicalHistory">Tiền sử bệnh</label>
                                <input id="medicalHistory" placeholder="Tiền sử bệnh"
                                    value={medicalHistory} onChange={(e) => setMedicalHistory(e.target.value)}
                                    className='w-full border px-2 py-1 border-gray-300 rounded-md' />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
                            <FaSave className="w-4 h-4" />
                            Lưu thay đổi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPatientInfo; 