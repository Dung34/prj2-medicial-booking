const express = require('express')
const { createSpeciality,
    addSpecialityToDoctor,
    getAllSpecialities,
    deleteSpecialitybyID,
    searchSpecialitybyId,
    searchSpecialitybyDoctorId,
    searchDoctorbySpecialityId } = require('./speciality.controller')
const verifyToken = require('../Auth/verifyToken')

const router = express.Router()

router.post('/create', verifyToken, createSpeciality)

router.post('/addSpecialityToDoctor', verifyToken, addSpecialityToDoctor)

router.get('/', verifyToken, getAllSpecialities)

router.delete('/:id', verifyToken, deleteSpecialitybyID)

router.get('/searchSpecialitybyId/:id', verifyToken, searchSpecialitybyId)

router.get('/searchSpecialitybyDoctorId/:doctor_id', verifyToken, searchSpecialitybyDoctorId)

router.get('/searchDoctorbySpecialityId/:speciality_id', verifyToken, searchDoctorbySpecialityId)


module.exports = router