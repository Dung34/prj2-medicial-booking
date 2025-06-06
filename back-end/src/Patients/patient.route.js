const express = require('express')

const Patient = require('./patient.model')
const { registerPatient, getAllPatients, getPatientById, updatePatientById, deletePatientById, getPatientByUserId } = require('./patient.controller')
const verifyToken = require('../Auth/verifyToken')

const router = express.Router()

router.post('/register/:userId', registerPatient)

router.get('/user/:userId', getPatientByUserId)

router.get('/', verifyToken, getAllPatients)

router.get('/:id', getPatientById)

router.put('/:id', verifyToken, updatePatientById)

router.delete('/:id', verifyToken, deletePatientById)
module.exports = router