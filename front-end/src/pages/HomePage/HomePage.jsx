import React from 'react'
import MedicalSection from '../../component/MedicalSection/MedicalSection'
import AppointmentForm from '../../component/AppointmentForm/AppointmentForm'
import Services from '../../component/Services/Services'
import Reviews from '../../component/Reviews/Reviews'
import Recommend from '../../component/Recommend/Recommend'
import Navbar from '../../component/Navbar/Navbar'
import SelectSpeciality from '../../component/SelectSpeciality/SelectSpeciality'

const HomePage = () => {
    return (
        <div>
            <Navbar />
            {/* <MedicalSection />
            <AppointmentForm />
            <Services />
            <Reviews />
            <Recommend /> */}
            <SelectSpeciality />
        </div>
    )
}

export default HomePage
