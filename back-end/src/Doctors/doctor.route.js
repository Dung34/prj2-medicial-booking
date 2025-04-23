const express = require('express')
// const Doctor = require('./doctor.model')
const { registerDoctor, getAllDoctors, getDoctorById, updateDoctorById, deleteDoctorById, registerTimeOff, uploadImage } = require('./doctor.controller')
const verifyToken = require('../Auth/verifyToken')
const uploadToCloud = require('../Midlleware/multer')

const router = express.Router()

router.post('/register', registerDoctor)

router.get('/', verifyToken, getAllDoctors)

router.get('/:id', getDoctorById)

router.put('/update/:id', updateDoctorById)

router.delete('/:id', deleteDoctorById)

router.post('/timeOff', registerTimeOff)

router.post('/upload', uploadToCloud.single('file'), uploadImage)
module.exports = router