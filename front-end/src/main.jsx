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
import DoctorManagement from './pages/AppointmentDashboard/DoctorManagement.jsx'
import DoctorEdit from './pages/DoctorProfile/DoctorEdit.jsx'
import EMRPage from './pages/EMR/EMRPage.jsx'
import EMREdit from './pages/EMR/EMREdit.jsx'
import RegisterPageVer2 from './pages/RegisterPage/RegisterPageVer2.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
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
    path: '/dashboard/edit',
    element: <DoctorEdit />
  },
  {
    path: '/dashboard/register',
    element: <DoctorProfileUpload />
  },
  {
    path: '/doctor/dashboard',
    element: <DoctorDashboard />
  },
  {
    path: '/emr/:appId',
    element: <EMRPage />
  },
  {
    path: '/emr/edit/:emrId',
    element: <EMREdit />
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>

  </React.StrictMode>
)
