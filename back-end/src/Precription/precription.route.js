const express = require('express');
const router = express.Router();
const {
    createPrecription,
    getAllPrecriptions,
    getPrecriptionById,
    getPrecriptionByEMRId,
    updatePrecription,
    deletePrecription
} = require('./precription.controller');


router.post('/', createPrecription);
router.get('/', getAllPrecriptions);
router.get('/:id', getPrecriptionById);
router.get('/emr/:emr_id', getPrecriptionByEMRId);
router.put('/:id', updatePrecription);
router.delete('/:id', deletePrecription);

module.exports = router;