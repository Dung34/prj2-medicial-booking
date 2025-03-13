const Patient = require('./patient.model')

const registerPatient = async (req, res) => {
    try {
        const newPatient = await Patient({ ...req.body })
        await newPatient.save()
        res.status(200).send({ "message": "Patient registered successfully", "data": newPatient })
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": "Internal server error", "error": error })
    }
}

const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find()
        res.status(200).send(patients)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": "Internal server error", "error": error })
    }
}

const getPatientById = async (req, res) => {
    try {
        const { id } = req.params
        const patient = await Patient.findById(id)
        if (!patient) {
            res.status(404).send({ "message": "Patient not found" })
        }
        res.status(200).send(patient)
    }
    catch {
        console.log(error)
        res.status(500).send({ "message": "Internal server error", "error": error })
    }

}

const updatePatientById = async (req, res) => {
    try {
        const { id } = req.params
        const patient = await Patient.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        )
        if (!patient) {
            res.status(404).send({ "message": "Patient not found" })
        }
        res.status(200).send(patient)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": "Internal server error", "error": error })
    }
}

const deletePatientById = async (req, res) => {
    try {
        const { id } = req.params
        const patient = await Patient.findByIdAndDelete(id)
        if (!patient) {
            res.status(404).send({ "message": "Patient not found" })
        }
        res.status(200).send({ "message": "Patient deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": "Internal server error", "error": error })
    }
}
module.exports = { registerPatient, getAllPatients, getPatientById, updatePatientById, deletePatientById }