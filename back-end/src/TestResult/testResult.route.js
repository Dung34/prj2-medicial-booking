const express = require('express')

const router = express.Router()
const {
    createTestResult,
    getAllTestResults,
    getTestResultById,
    getTestResultByEMRId,
    updateTestResult,
    deleteTestResult
} = require("./testResult.controller")
router.post('/create-test', createTestResult)

router.get('/', getAllTestResults)

router.get(':/id', getTestResultById)

router.get('/emr/:emr_id', getTestResultByEMRId)

router.put('/:id', updateTestResult)

router.delete('/:id', deleteTestResult)
module.exports = router