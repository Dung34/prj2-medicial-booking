const EMR = require('./emr.model')
const Appointment = require('../../src/Appointment/appointment.model')
const emrImageModel = require('../Model/emrImage.model')
const createEMR = async (req, res) => {
    try {
        const { appId } = req.params
        const appointment = await Appointment.findById(appId)
        if (!appointment) {
            return res.status(404).send({ "message": "Appointment not found!!" })
        }
        const newEMR = await EMR({ ...req.body })
        await newEMR.save()
        res.status(200).send({ "message": "EMR created successfully", "data": newEMR })
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": error })
    }
}
const uploadEmrImage = async (req, res) => {
    try {
        const { id } = req.params
        const appointment = await Appointment.findById(id)
        if (!appointment) {
            return res.status(404).send({ "message": "Khong tim thay lich hen nao" })

        }
        let imageUrl = []
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const newImage = new emrImageModel({
                    url: file.path,
                    appointment_id: id
                })
                await newImage.save()

            }
            return res.status(200).send({ 'message': "Upload anh thanh cong !!" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": error })
    }
}

const getImageByAppId = async (req, res) => {
    try {
        const { id } = req.params
        const appointment = await Appointment.findById(id)
        if (!appointment) {
            return req.status(404).send({ "message": "Khong tim thay lich hen nao" })
        }
        const images = await emrImageModel.find({ appointment_id: id });
        if (!images) {
            return res.status(404).send({ "message": "Benh an khong co anh " })

        }
        return res.status(200).send({ images })
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
            return res.status(404).send({ "mesage": "EMR not found" })
        }
        const appointment = await Appointment.findById(emr.appoinment_id)
        if (!appointment) {
            return res.status(404).send({ "message": "Appointment not found !!" })
        }
        return res.status(200).send({ emr, appointment })
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
    deleteEMRById,
    uploadEmrImage,
    getImageByAppId,
}
