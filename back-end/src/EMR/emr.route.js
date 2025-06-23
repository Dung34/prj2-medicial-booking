const express = require('express');

const router = express.Router();
const { createEMR, getAllEMR, getEMRById, getEMRByAppointmentId, updateEMRById, deleteEMRById, uploadEmrImage, getImageByAppId, getEMRByPatientId } = require('./emr.controller');
const uploadToCloud = require('../Midlleware/multer')
router.post('/create/:appId', createEMR);

router.get('/', getAllEMR);

router.get('/getEmr/:id', getEMRById);

router.get('/appointment/:appointment_id', getEMRByAppointmentId);

router.post('/update/:id', updateEMRById);

router.get('/getEmrImage/:id', getImageByAppId)
router.post('/uploadImage/:id', uploadToCloud.array('images', 10), uploadEmrImage)
router.delete('/:id', deleteEMRById);

router.get('/patient/:patient_id', getEMRByPatientId);

module.exports = router;