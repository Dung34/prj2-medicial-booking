const TestResult = require('./testResult.model');

const createTestResult = async (req, res) => {
    try {
        const testResult = new TestResult({ ...req.body })
        await testResult.save()
        res.status(200).send(testResult)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": error })
    }
}
const getAllTestResults = async (req, res) => {
    try {
        const testResults = await TestResult.find()
        res.status(200).send(testResults)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": error })
    }
}

const getTestResultById = async (req, res) => {
    try {
        const { id } = req.params
        const testResult = await TestResult.FindById(id)
        if (!testResult) {
            res.status(404).send({ "message": "TestResult not found" })
        }
        res.status(200).send(testResult)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": error })
    }
}

const getTestResultByEMRId = async (req, res) => {
    try {
        const { emr_id } = req.params
        const testResult = await TestResult.findOne({ emr_id })
        if (!testResult) {
            res.status(404).send({ "message": "TestResult not found" })
        }
        res.status(200).send(testResult)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": error })
    }
}

const updateTestResult = async (req, res) => {
    try {
        const { id } = req.params
        const testResult = await TestResult.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        )
        if (!testResult) {
            res.status(404).send({ "message": "TestResult not found" })
        }
        res.status(200).send(testResult)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": error })
    }
}

const deleteTestResult = async (req, res) => {
    try {
        const { id } = req.params
        const testResult = await TestResult.findByIdAndDelete(id)
        if (!testResult) {
            res.status(404).send({ "message": "TestResult not found" })
        }
        res.status(200).send({ "message": "TestResult deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": error })
    }
}
module.exports = {
    createTestResult,
    getAllTestResults,
    getTestResultById,
    getTestResultByEMRId,
    updateTestResult,
    deleteTestResult
}