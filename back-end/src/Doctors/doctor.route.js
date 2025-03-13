const express = require('express')
// const Doctor = require('./doctor.model')
const { registerDoctor, getAllDoctors, getDoctorById, updateDoctorById, deleteDoctorById } = require('./doctor.controller')

const router = express.Router()

router.post('/register', registerDoctor)

router.get('/', getAllDoctors)

router.get('/:id', getDoctorById)

router.put('/update/:id', updateDoctorById)

router.delete('/:id', deleteDoctorById)

module.exports = router