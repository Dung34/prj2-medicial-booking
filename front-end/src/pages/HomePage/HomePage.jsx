import React from 'react'
import MedicalSection from '../../component/MedicalSection/MedicalSection'
import AppointmentForm from '../../component/AppointmentForm/AppointmentForm'
import Services from '../../component/Services/Services'
import Reviews from '../../component/Reviews/Reviews'
import Recommend from '../../component/Recommend/Recommend'

const HomePage = () => {
    return (
        <div>
            <MedicalSection />
            <AppointmentForm />
            <Services />
            <Reviews />
            <Recommend />
        </div>
    )
}

export default HomePage
