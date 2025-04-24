import React, { useState } from 'react';
import axios from 'axios';
import { FaUpload, FaPlus, FaTrash } from 'react-icons/fa';

const DoctorProfileUpload = () => {
    const [profileImage, setProfileImage] = useState(null);
    // const [certifications, setCertifications] = useState([]);
    // const [newCertification, setNewCertification] = useState({
    //     title: '',
    //     issuer: '',
    //     date: '',
    //     image: null
    // });
    const apiUrl = import.meta.env.VITE_API_URL;

    // const handleProfileImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setProfileImage(file);
    //     }
    // };

    // const handleCertificationImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setNewCertification(prev => ({
    //             ...prev,
    //             image: file
    //         }));
    //     }
    // };

    // const handleCertificationInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setNewCertification(prev => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // };

    // const addCertification = () => {
    //     if (newCertification.title && newCertification.issuer && newCertification.date && newCertification.image) {
    //         setCertifications(prev => [...prev, newCertification]);
    //         setNewCertification({
    //             title: '',
    //             issuer: '',
    //             date: '',
    //             image: null
    //         });
    //     }
    // };

    // const removeCertification = (index) => {
    //     setCertifications(prev => prev.filter((_, i) => i !== index));
    // };
    const handleUpload = async () => {
        if (!profileImage) {
            return;
        }
        const formData = new FormData();
        formData.append('file', profileImage);

        try {
            const response = await axios.post(`${apiUrl}/api/doctor/upload?doctor_id=DOC001`, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(response.status);
            alert('Profile image uploaded successfully!');
        } catch (error) {

        }
    }
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         if (!profileImage) {
    //             alert('Please select an image to upload');
    //             return;
    //         }

    //         // Create FormData for profile image
    //         const profileFormData = new FormData();
    //         profileFormData.append('file', profileImage);

    //         // Log the FormData contents
    //         console.log('FormData contents:');
    //         for (let pair of profileFormData.entries()) {
    //             console.log(pair[0] + ': ' + pair[1]);
    //         }

    //         const url = `http://localhost:3000/api/doctor/upload?doctor_id=DOC001`;
    //         console.log('Attempting to upload to:', url);

    //         // Try using fetch instead of axios
    //         const response = await fetch(url, {
    //             method: 'POST',
    //             body: profileFormData,
    //             headers: {
    //                 'Accept': 'application/json'
    //             }
    //         });

    //         console.log('Response status:', response.status);
    //         const data = await response.json();
    //         console.log('Response data:', data);

    //         if (response.ok) {
    //             alert('Profile image uploaded successfully!');
    //         } else {
    //             throw new Error(data.message || 'Upload failed');
    //         }

    //     } catch (error) {
    //         console.error('Full error object:', error);
    //         console.error('Error stack:', error.stack);

    //         if (error.response) {
    //             console.error('Error response data:', error.response.data);
    //             console.error('Error response status:', error.response.status);
    //             alert(`Error: ${error.response.data.message || 'Upload failed'}`);
    //         } else if (error.request) {
    //             console.error('No response received:', error.request);
    //             alert('No response from server. Please check your connection.');
    //         } else {
    //             console.error('Error message:', error.message);
    //             alert(`Error: ${error.message}`);
    //         }
    //     }
    // };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Hồ sơ</h2>

            <form className="space-y-6">
                {/* Profile Image Upload */}
                <div className="border rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Ảnh hồ sơ</h3>
                    <div className="flex items-center space-x-4">
                        <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                            {profileImage ? (
                                <img
                                    src={URL.createObjectURL(profileImage)}
                                    alt="Profile preview"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <FaUpload className="text-gray-400 text-3xl" />
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload Profile Image
                            </label>
                            <input
                                type="file"
                                // accept="image/*"
                                onChange={(e) => setProfileImage(e.target.files[0])}
                                className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-green-50 file:text-green-700
                                    hover:file:bg-green-100"
                            />
                        </div>
                        <div>{!profileImage ? '0' : '1'}</div>
                    </div>
                </div>

                {/* Certifications Section */}

                {/* Submit Button */}
                <button
                    type="button"
                    onClick={handleUpload}
                    className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
                >
                    Save Profile and Certifications
                </button>
            </form>
        </div>
    );
};

export default DoctorProfileUpload; 