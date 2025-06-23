import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";
import Cookies from 'js-cookie'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const apiUrl = import.meta.env.VITE_API_URL

    const [accessToken, setAccessToken] = useState(null)
    const [error, setError] = useState(null)
    const [user, setUser] = useState({})
    const [patient, setPatient] = useState(null)
    const [doctor, setDoctor] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    // Set up axios interceptor for automatic token refresh
    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                if (accessToken) {
                    config.headers.Authorization = accessToken
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

        const responseInterceptor = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true

                    try {
                        const response = await axios.post(`${apiUrl}/login/refresh`, {}, {
                            withCredentials: true
                        })

                        if (response.status === 200) {
                            setAccessToken(response.data.data.accessToken)
                            return axios(originalRequest)
                        }
                    } catch (refreshError) {
                        // Refresh token failed, logout user
                        await logout()
                        return Promise.reject(refreshError)
                    }
                }

                return Promise.reject(error)
            }
        )

        return () => {
            axios.interceptors.request.eject(requestInterceptor)
            axios.interceptors.response.eject(responseInterceptor)
        }
    }, [accessToken, apiUrl])

    const setUserCookie = (userData) => {
        setUser(userData);
        Cookies.set('user', JSON.stringify(userData), {
            expires: 7, // 7 days
            secure: false, // only save if https
            sameSite: 'Lax',
        });
    };

    const login = async (email, password, role) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.post(`${apiUrl}/login`, {
                "email": email,
                "password": password,
                "role": role
            }, {
                withCredentials: true,
            })

            if (response.status === 200) {
                setAccessToken(response.data.data.accessToken)
                setUser(response.data.data.user)
                setUserCookie(response.data.data.user)

                // Fetch additional user data based on role
                if (response.data.data.role === "patient") {
                    try {
                        const patientRes = await axios.get(`${apiUrl}/api/patient/user/${response.data.data.userId}`)
                        if (patientRes.status === 200) {
                            setPatient(patientRes.data.data)
                        } else {
                            setError(patientRes.data.message)
                        }
                    } catch (patientError) {
                        console.log('Patient data fetch error:', patientError)
                    }
                }

                if (response.data.data.role === "doctor") {
                    try {
                        const doctorRes = await axios.get(`${apiUrl}/api/doctor/user/${response.data.data.userId}`)
                        if (doctorRes.status === 200) {
                            setDoctor(doctorRes.data.data)
                        } else {
                            setError(doctorRes.data.message)
                        }
                    } catch (doctorError) {
                        console.log('Doctor data fetch error:', doctorError)
                    }
                }

                return { success: true, message: response.data.message }
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại'
            setError(errorMessage)
            return { success: false, message: errorMessage }
        } finally {
            setIsLoading(false)
        }
    }

    const registerUser = async (email, password, role, asAdmin = false) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.post(`${apiUrl}/login/signIn`, {
                "email": email,
                "password": password,
                "role": role
            })

            if (response.status === 200) {
                if (!asAdmin) {
                    setUserCookie(response.data.data)
                    setUser(response.data.data)
                }
                return { success: true, message: response.data.message, user: response.data.data }
            }

            if (response.status === 201) {
                setUser({})
                setError(response.data.message)
                return { success: false, message: response.data.message }
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Đăng ký thất bại'
            setError(errorMessage)
            return { success: false, message: errorMessage }
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async () => {
        try {
            // Call logout endpoint to clear server-side cookie
            await axios.post(`${apiUrl}/login/logout`, {}, {
                withCredentials: true
            })
        } catch (error) {
            console.log('Logout error:', error)
        } finally {
            // Clear client-side state regardless of server response
            setAccessToken(null)
            setUser(null)
            setDoctor(null)
            setPatient(null)
            setError(null)

            // Clear cookies
            Cookies.remove('user')

            // Clear localStorage if you're storing anything there
            localStorage.removeItem('id')
            localStorage.removeItem('token')
        }
    }

    // Check if user is authenticated
    const isAuthenticated = () => {
        return !!accessToken && !!user._id
    }

    return (
        <AuthContext.Provider value={{
            accessToken,
            user,
            doctor,
            patient,
            login,
            logout,
            error,
            registerUser,
            isLoading,
            isAuthenticated
        }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)



