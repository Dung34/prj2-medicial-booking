const express = require('express')
const { createSpeciality,
    addSpecialityToDoctor,
    getAllSpecialities,
    deleteSpecialitybyID,
    searchSpecialitybyId,
    searchSpecialitybyDoctorId,
    getDocBySpecialityName } = require('./speciality.controller')
const verifyToken = require('../Auth/verifyToken')

const router = express.Router()

router.post('/create', createSpeciality)

router.post('/addSpecialityToDoctor', verifyToken, addSpecialityToDoctor)

router.get('/', getAllSpecialities)

router.delete('/:id', verifyToken, deleteSpecialitybyID)

router.get('/searchSpecialitybyId/:id', verifyToken, searchSpecialitybyId)

router.get('/searchSpecialitybyDoctorId/:doctor_id', verifyToken, searchSpecialitybyDoctorId)

router.get('/getDocBySpecialityName/:speciality_name', getDocBySpecialityName)


module.exports = router