import axios from "axios";
import { useContext, createContext, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const apiUrl = import.meta.env.VITE_API_URL

    const [accessToken, setAccessToken] = useState(null)

    const [error, setError] = useState(null)
    const [user, setUser] = useState({})

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

    const registerUser = async (email, password, role) => {
        try {
            const response = await axios.post(`${apiUrl}/login/signIn`, {
                "email": email,
                "password": password,
                "role": role
            })
            if (response.status == 200) {
                setUser(response.data.data)


            }
            if (response.status == 201) {
                setUser({})
                setError(response.data.message)
            }
            alert(response.data.message)
        } catch (error) {
            alert(error)
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
        <AuthContext.Provider value={{ accessToken, user, doctor, patient, login, logout, error, registerUser }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)



