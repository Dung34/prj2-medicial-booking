import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showNotification, setShowNotification] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // Handle login logic here (e.g., API call)
        try {
            const response = await axios.post('http://localhost:3000/login', {
                email,
                password
            });
            console.log("id: ", response.data.id);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('patient_id', response.data.id);
            setError("Đăng nhập thành công")
            setShowNotification(true)

            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            console.error('Error:', error);
            setError('Đăng nhập thất bại');
            setShowNotification(true)
            setTimeout(() => {
                setShowNotification(false)
            }, 3000)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
            {showNotification && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 p-8 rounded-lg z-20 bg-amber-50">
                    <h2 className="text-2xl font-semibold mb-4">Thông báo</h2>
                    <p>{error}</p>
                </div>
            )}
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button>
                        <a
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            href="#"
                        >
                            Forgot Password?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
