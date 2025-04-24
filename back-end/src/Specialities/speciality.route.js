const express = require('express')
const { createSpeciality,
    getAllSpecialities,
    deleteSpecialitybyID,
    searchSpecialitybyId,
    getDocBySpecialityName } = require('./speciality.controller')


const router = express.Router()

router.post('/create', createSpeciality)
router.get('/', getAllSpecialities)
router.delete('/:id', deleteSpecialitybyID)
router.get('/searchSpecialitybyId/:id', searchSpecialitybyId)
router.get('/getDocBySpecialityName/:speciality_id', getDocBySpecialityName)


module.exports = router