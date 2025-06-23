import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { CiUser, CiPhone, CiHeart } from "react-icons/ci";
import DateOfBirthPicker from '../../component/ui/DateOfBirthPicker';
import { useAuth } from '../../context/AuthContext';
import Cookies from 'js-cookie'
const RegisterPage = () => {
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL
    const { user, registerUser } = useAuth()

    const [sername, setSername] = useState('')
    const [name, setName] = useState('')
    const [dob, setDob] = useState()
    const [identificationNumber, setIdentificationNumber] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [addressCity, setAddressCity] = useState('')
    const [addressDistrict, setAddressDistrict] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [contactName, setContactName] = useState('')
    const [contactPhoneNumber, setContactPhoneNumber] = useState('')
    const [contactRelationship, setContactRelationship] = useState('')

    const [gender, setGender] = useState("")
    const [bloodType, setBloodType] = useState("")
    const [height, setHeight] = useState('')
    const [allergy, setAllergy] = useState('')
    const [currentMedical, setCurrentMedical] = useState('')
    const [medicalHistory, setMedicalHistory] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log(user)
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        if (password !== confirmPassword) {
            setError('Mật khẩu không trùng khớp.');
            return;
        }
        try {
            // 1. Register patient account using AuthContext
            const result = await registerUser(email, password, 'patient', true);
            if (!result.success) {
                setError(result.message);
                return;
            }
            // Get userId from result or refetch if needed
            let userId = null;
            if (result.user && result.user._id) {
                userId = result.user._id;
            } else {
                // fallback: fetch user by email (should not be needed if context is correct)
                const userRes = await axios.get(`${apiUrl}/api/patient/user-by-email/${email}`);
                userId = userRes.data._id;
            }
            // 2. Register patient profile
            const response = await axios.post(`${apiUrl}/api/patient/register/${userId}`, {
                "sername": sername,
                "name": name,
                "phoneNumber": phoneNumber,
                "dateOfBirth": dob,
                "gender": gender,
                "identificationNumber": identificationNumber,
                'bloodType': bloodType,
                "address": address,
                "addressCity": addressCity,
                "addressDistrict": addressDistrict,
                "contactName": contactName,
                "contactPhoneNumber": contactPhoneNumber,
                "contactRelationship": contactRelationship,
                "height": height,
                "allergy": allergy,
                "currentMedical": currentMedical,
                "medicalHistory": medicalHistory,
                "zipCode": zipCode
            });
            if (response.status === 200) {
                setSuccess(true);
                setTimeout(() => navigate('/'), 2000);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Đăng ký thất bại.');
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <button variant="ghost" className="px-4 py-2 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-amber-50 flex flex-row items-center">
                        <FaArrowLeft className="w-4 h-4 mr-2" />
                        Trở vể trang đăng ký
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2 flex flex-col">
                                    <label htmlFor="emergencyName">Họ tên *</label>
                                    <input id="emergencyName" placeholder="Họ tên"
                                        value={contactName} onChange={(e) => setContactName(e.target.value)}
                                        className='w-full border px-2 py-1 border-gray-300 rounded-md' required />
                                </div>
                                <div className="space-y-2 flex flex-col">
                                    <label htmlFor="emergencyPhone">Số điện thoại *</label>
                                    <input
                                        id="emergencyPhone"
                                        type="tel"
                                        placeholder="Số điện thoại"
                                        value={contactPhoneNumber} onChange={(e) => setContactPhoneNumber(e.target.value)}
                                        className='w-full border px-2 py-1 border-gray-300 rounded-md'
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 flex flex-col">
                                <label htmlFor="emergencyRelation">Mối quan hệ</label>
                                <select
                                    id="emergencyRelation"
                                    value={contactRelationship}
                                    onChange={(e) => setContactRelationship(e.target.value)}
                                    className="w-full border px-2 py-1 border-gray-300 rounded-md"
                                >
                                    <option value="" disabled>Chọn mối quan hệ</option>
                                    <option value="spouse">Vợ chồng</option>
                                    <option value="parent">Cha mẹ</option>
                                    <option value="child">Con cái</option>
                                    <option value="sibling">Anh/Chị/Em</option>
                                    <option value="friend">Bạn bè</option>
                                    <option value="other">Khác</option>
                                </select>
                            </div>

                        </div>
                    </div>

                    {/* Medical Information */}
                    <div className='bg-white px-4 py-6 shadow-md rounded-md'>
                        <div>
                            <div className="flex items-center gap-2 text-purple-700 font-sans text-xl">
                                <CiHeart className="w-5 h-5" />
                                Thông tin y tế
                            </div>
                            <p className='font-sans font-[14px]'>Thông tin y tế quan trọng cho việc chăm sóc của bạn</p>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2 flex flex-col">
                                    <label htmlFor="bloodType">Nhóm máu</label>
                                    <select
                                        id="bloodType"
                                        value={bloodType}
                                        onChange={(e) => setBloodType(e.target.value)}
                                        className="w-full border px-2 py-1 border-gray-300 rounded-md"
                                    >
                                        <option value="" disabled>Chọn nhóm máu</option>
                                        <option value="a-positive">A+</option>
                                        <option value="a-negative">A-</option>
                                        <option value="b-positive">B+</option>
                                        <option value="b-negative">B-</option>
                                        <option value="ab-positive">AB+</option>
                                        <option value="ab-negative">AB-</option>
                                        <option value="o-positive">O+</option>
                                        <option value="o-negative">O-</option>
                                    </select>
                                </div>

                                <div className="space-y-2 flex flex-col">
                                    <label htmlFor="height">Cân nặng (kg)</label>
                                    <input id="height" placeholder="Cân nặng"
                                        value={height} onChange={(e) => setHeight(e.target.value)}
                                        className='w-full border px-2 py-1 border-gray-300 rounded-md' />
                                </div>
                            </div>

                            <div className="space-y-2 flex flex-col">
                                <label htmlFor="allergies">Dị ứng</label>
                                <textarea
                                    id="allergies"
                                    placeholder="Liệt kê bất kỳ dị ứng nào đã biết (thuốc, thực phẩm, môi trường, v.v.)"
                                    value={allergy} onChange={(e) => setAllergy(e.target.value)}
                                    className="min-h-[80px] w-full border px-2 py-1 border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="space-y-2 flex flex-col">
                                <label htmlFor="medications">Thuốc hiện tại đăng sử dụng</label>
                                <textarea
                                    id="medications"
                                    placeholder="Liệt kê tất cả các loại thuốc hiện tại với liều lượng"
                                    value={currentMedical} onChange={(e) => setCurrentMedical(e.target.value)}
                                    className="min-h-[80px] w-full border px-2 py-1 border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="space-y-2 flex flex-col">
                                <label htmlFor="medicalHistory">Tiền sử bệnh lý</label>
                                <textarea
                                    id="medicalHistory"
                                    placeholder="Tiền sử phẫu thuật, bệnh mãn tính, tiền sử gia đình, v.v."
                                    value={medicalHistory} onChange={(e) => setMedicalHistory(e.target.value)}
                                    className="min-h-[100px] w-full border px-2 py-1 border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>



                    {/* Consent and Preferences */}
                    <div className='bg-white px-4 py-6 shadow-md rounded-md'>
                        <div>

                            <p className='font-bold text-2xl'>Tùy chọn liên lạc</p>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <input type='checkbox' id="smsReminders" defaultChecked />
                                    <label htmlFor="smsReminders">Nhận nhắc lịch hẹn qua tin nhắn SMS</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type='checkbox' id="emailReminders" defaultChecked />
                                    <label htmlFor="emailReminders">Nhận nhắc lịch hẹn qua email</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type='checkbox' id="marketingEmails" />
                                    <label htmlFor="marketingEmails">Nhận mẹo sức khỏe và email khuyến mãi</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type='checkbox' id="dataSharing" />
                                    <label htmlFor="dataSharing">
                                        Cho phép chia sẻ dữ liệu y tế với bác sĩ chuyên khoa khi được giới thiệu
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Action Buttons */}
                    <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 pt-6">
                        <button type="submit" className="text-white py-2 rounded-md w-full flex flex-row items-center justify-center bg-blue-600 hover:bg-blue-700">
                            <FaSave className="w-4 h-4 mr-2 " />
                            Cập nhật thông tin bệnh nhân
                        </button>
                        <button type="button" variant="outline" className="bg-white hover:bg-gray-100 flex justify-center items-center border border-gray-300 rounded-md py-2">
                            Hủy thay đổi
                        </button>
                    </div>
                </form>

                {/* Footer Note */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                        <strong>Chú ý : </strong>Mọi thông tin đều được mã hóa và lưu trữ an toàn theo quy định của HIPAA
                        . Các trường có dấu * là bắt buộc. Vui lòng đảm bảo mọi thông tin đều chính xác để được
                        chăm sóc y tế tốt nhất.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-700 p-2 rounded mb-2 text-center">{error}</div>
                )}
                {success && (
                    <div className="bg-green-100 text-green-700 p-2 rounded mb-2 text-center">Đăng ký thành công! Chuyển hướng đến trang chủ...</div>
                )}
            </div>
        </div>
    )
}

export default RegisterPage
