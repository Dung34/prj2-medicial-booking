const express = require('express')

const Appointment = require('./appointment.model')
const { registerAppointment,
    getAllAppointments,
    getAppointmentById,
    getAppointmentByPatientId,
    getAppointmentByDoctorId,
    updateAppointmentById,
    deleteAppointmentById,
    countData, } = require('./appointment.controller')

const router = express.Router()

router.post('/register', registerAppointment)

router.get('/', getAllAppointments)
router.get('/count', countData)

router.get('/:id', getAppointmentById)

router.get('/patient/:patient_id', getAppointmentByPatientId)

router.get('/doctor/:doctor_id', getAppointmentByDoctorId)

router.put('/:id', updateAppointmentById)

router.delete('/:id', deleteAppointmentById)

module.exports = router