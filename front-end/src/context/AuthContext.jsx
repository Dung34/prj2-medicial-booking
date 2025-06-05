import axios from "axios";
import { useContext, createContext, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const apiUrl = import.meta.env.VITE_API_URL

    const [accessToken, setAccessToken] = useState(null)

    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)

    const [patient, setPatient] = useState(null)

    const [doctor, setDoctor] = useState(null)

    const login = async (email, password, role) => {
        const response = await axios.post(`${apiUrl}/login`, {
            "email": email,
            "password": password,
            "role": role
        }, {
            withCredentials: true,
        })
        if (response.status == 200) {
            setAccessToken(response.data.data.accessToken)
            setUser(response.data.data.user)
            if (response.data.data.role === "patient") {
                const patientRes = await axios.get(`${apiUrl}/patient/user/${response.data.data.userId}`)
                if (patientRes.status == 200) {
                    setPatient(patientRes.data.data)
                }
                else {
                    setError(patientRes.data.message)
                }
            }
            if (response.data.data.role === "doctor") {
                const doctorRes = await axios.get(`${apiUrl}/doctor/user/${response.data.data.userId}`)
                if (doctorRes.status == 200) {
                    setDoctor(doctorRes.data.data)
                } else {
                    setError(doctorRes.data.message)
                }
            }
        }


    }

    const logout = async () => {
        await axios.post(`${apiUrl}/login/logout`, {}, { withCredentials: true })
        setAccessToken(null)
        setUser(null)
        setDoctor(null)
        setPatient(null)
    }

    return (
        <AuthContext.Provider value={{ accessToken, user, doctor, patient, login, logout, error }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)



