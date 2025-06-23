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
import ProtectedRoute from './component/ProtectedRoute.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import MyAppointments from './pages/MyAppointments/MyAppointments.jsx'
import MyEMR from './pages/MyEMR/MyEMR.jsx'
import EditPatientInfo from './pages/RegisterPage/EditPatientInfo.jsx'
import DoctorRegister from './pages/DoctorProfile/DoctorRegister.jsx'
import DoctorNotVerified from './pages/AppointmentDashboard/DoctorNotVerified.jsx'

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
    element: (
      <ProtectedRoute>
        <Appointment />
      </ProtectedRoute>
    )
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AppointmentDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: '/dashboard/edit',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DoctorEdit />
      </ProtectedRoute>
    )
  },
  {
    path: '/dashboard/register',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <RegisterDoctorForm />
      </ProtectedRoute>
    )
  },
  {
    path: '/dashboard/not-verified-doctors',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DoctorNotVerified />
      </ProtectedRoute>
    )
  },
  {
    path: '/doctor-dashboard',
    element: (
      <ProtectedRoute allowedRoles={['doctor']}>
        <DoctorDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: '/emr/:appId',
    element: (
      <ProtectedRoute allowedRoles={['doctor', 'patient']}>
        <EMRPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/emr/edit/:emrId',
    element: (
      <ProtectedRoute allowedRoles={['doctor']}>
        <EMREdit />
      </ProtectedRoute>
    )
  },
  {
    path: '/my-appointments',
    element: (
      <ProtectedRoute allowedRoles={['patient']}>
        <MyAppointments />
      </ProtectedRoute>
    )
  },
  {
    path: '/my-emr',
    element: (
      <ProtectedRoute allowedRoles={['patient']}>
        <MyEMR />
      </ProtectedRoute>
    )
  },
  {
    path: '/edit-patient-info',
    element: (
      <ProtectedRoute allowedRoles={['patient']}>
        <EditPatientInfo />
      </ProtectedRoute>
    )
  },
  {
    path: '/register-doctor',
    element: <DoctorRegister />
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
