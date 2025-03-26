const express = require('express')

const Patient = require('./patient.model')
const { registerPatient, getAllPatients, getPatientById, updatePatientById, deletePatientById } = require('./patient.controller')
const verifyToken = require('../Auth/verifyToken')

const router = express.Router()

router.post('/register', registerPatient)

router.get('/', verifyToken, getAllPatients)

router.get('/:id', verifyToken, getPatientById)

router.put('/:id', verifyToken, updatePatientById)

router.delete('/:id', verifyToken, deletePatientById)
module.exports = router