import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import LoginPage from './pages/LoginPage/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx'
// import ListDoctor from './component/ListDoctor/ListDoctor.jsx'
import Appointment from './pages/AppointmentPage/Appointment.jsx'
import DoctorSelection from './pages/DoctorrSelection/DoctorSelection.jsx'
import AppointmentDashboard from './pages/AppointmentDashboard/AppointmentDashboard.jsx'
import DoctorDashboard from './pages/DoctorDashboard/DoctorDashboard.jsx'
import DoctorProfile from './pages/DoctorProfile/DoctorProfile.jsx'
import RegisterDoctorForm from './pages/AppointmentDashboard/DoctorRegistrationForm.jsx'
import DoctorProfileUpload from './pages/AppointmentDashboard/DoctorProfileUpload.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: '/doctors/:speciality_id',
    element: <DoctorSelection />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/appointment/:doctor_id',
    element: <Appointment />
  },
  {
    path: '/dashboard',
    element: <AppointmentDashboard />
  },
  {
    path: '/dashboard/register',
    element: <DoctorProfileUpload />
  },
  {
    path: '/doctor/dashboard',
    element: <DoctorDashboard />
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <RouterProvider router={router} />
  </React.StrictMode>
)
