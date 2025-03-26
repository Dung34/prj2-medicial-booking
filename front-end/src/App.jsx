import React from 'react'
import Navbar from './component/Navbar/Navbar'
import MedicalSection from './component/MedicalSection/MedicalSection'
import AppointmentForm from './component/AppointmentForm/AppointmentForm'
import Services from './component/Services/Services'
import Reviews from './component/Reviews/Reviews'
import Recommend from './component/Recommend/Recommend'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
