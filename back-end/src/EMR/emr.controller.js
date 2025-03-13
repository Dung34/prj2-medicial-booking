const EMR = require('./emr.model')

const createEMR = async (req, res) => {
    try {
        const newEMR = await EMR({ ...req.body })
        await newEMR.save()
        res.status(200).send({ "message": "EMR created successfully", "data": newEMR })
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": error })
    }
}

const getAllEMR = async (req, res) => {
    try {
        const emrs = await EMR.find()
        res.status(200).send(emrs)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": error })
    }
}
const getEMRById = async (req, res) => {
    try {
        const { id } = req.params
        const emr = await EMR.findById(id)
        if (!emr) {
            res.status(404).send({ "mesage": "EMR not found" })
        }
        res.status(200).send(emr)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": error })
    }
}

const getEMRByAppointmentId = async (req, res) => {
    try {
        const { appointment_id } = req.params
        const emr = await EMR.findOne({ appointment_id })
        if (!emr) {
            res.status(404).send({ "mesage": "EMR not found" })
        }
        res.status(200).send(emr)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": error })
    }
}

const updateEMRById = async (req, res) => {
    try {
        const { id } = req.params
        const updateEMR = await EMR.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        )
        if (!updateEMR) {
            res.status(404).send({ "message": "EMR not found" })
        }
        res.status(200).send(updateEMR)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": error })
    }
}

const deleteEMRById = async (req, res) => {
    try {
        const { id } = req.params
        const emr = await EMR.findByIdAndDelete(id)
        if (!emr) {
            res.status(404).send({ "message": "EMR not found" })
        }
        res.status(200).send({ "message": "EMR deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": error })
    }
}
module.exports = {
    createEMR,
    getAllEMR,
    getEMRById,
    getEMRByAppointmentId,
    updateEMRById,
    deleteEMRById
}
