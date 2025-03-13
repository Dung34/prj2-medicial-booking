const express = require('express');

const router = express.Router();
const { createEMR, getAllEMR, getEMRById, getEMRByAppointmentId, updateEMRById, deleteEMRById } = require('./emr.controller');

router.post('/create', createEMR);

router.get('/', getAllEMR);

router.get('/:id', getEMRById);

router.get('/appointment/:appointment_id', getEMRByAppointmentId);

router.put('/update/:id', updateEMRById);

router.delete('/:id', deleteEMRById);

module.exports = router;