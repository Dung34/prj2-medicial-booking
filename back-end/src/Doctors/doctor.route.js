const express = require('express')
// const Doctor = require('./doctor.model')
const { registerDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctorById,
    deleteDoctorById,
    registerTimeOff,
    uploadImage,
    registerEduAndCert,
    getDoctorSchedule,
    getDoctorProfileImage,
    getEduAndCert,
    updateEduAndCert,
    getDoctorByUserId,
    getDoctorNotVerified
} = require('./doctor.controller')
const verifyToken = require('../Auth/verifyToken')
const uploadToCloud = require('../Midlleware/multer')

const router = express.Router()

router.post('/register', registerDoctor)

router.get('/', getAllDoctors)
router.get('/not-verified', getDoctorNotVerified)
router.get('/get-doctor/:id', getDoctorById)

router.get('/user/:userId', getDoctorByUserId)
router.post('/update/:id', updateDoctorById)

router.delete('/:id', deleteDoctorById)

router.post('/timeOff', registerTimeOff)

router.post('/upload', uploadToCloud.single('file'), uploadImage)

router.post('/eduAndCert', registerEduAndCert)

router.get('/eduAndCert', getEduAndCert)

router.post('/updateEduAndCert', updateEduAndCert)
router.get('/schedule/:doctor_id', getDoctorSchedule)

router.get('/profile-image', getDoctorProfileImage)
module.exports = router