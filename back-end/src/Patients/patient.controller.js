const User = require('../Model/user.model')
const Patient = require('./patient.model')

const registerPatient = async (req, res) => {
    try {
        const { userId } = req.params
        const patient = await Patient({ ...req.body, userId: userId })
        await patient.save()
        return res.status(200).send({ "message": "Đăng ký thông tin bệnh nhân thành công !" })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "message": "Internal server error", "error": error })
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
const getPatientByUserId = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).send({ "message": "Khong co nguoi dung nay" })
        }
        const patient = await Patient.findOne({ userId: userId })
        if (!patient) {
            return res.status(405).send({ 'message': "Benh nhan chua cap nhat thong tin !" })
        }
        return res.status(200).send({ "message": "Lay thong tin thanh cong !", "data": patient })
    } catch (error) {
        return res.status(500).send({ "message": error })
    }
}
module.exports = { registerPatient, getAllPatients, getPatientById, updatePatientById, deletePatientById, getPatientByUserId }