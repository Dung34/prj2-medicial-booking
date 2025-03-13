const Appointment = require("./appointment.model")

const registerAppointment = async (req, res) => {
    try {
        const newAppointment = await Appointment({ ...req.body })
        await newAppointment.save()
        res.status(200).send({ "message": "Appointment registered successfully", "data": newAppointment })
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": "Internal server error", "error": error })
    }
}

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
        res.status(200).send(appointments)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": error })
    }
}

const getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params
        const appointment = await Appointment.findById(id)
        if (!appointment) {
            res.status(404).send({ "message": "Appointment not found" })
        }
        res.status(200).send(appointment)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": error })
    }
}

const getAppointmentByPatientId = async (req, res) => {
    try {
        const { patient_id } = req.params
        const appoinment = await Appointment.find({ patient_id })
        if (!appoinment) {
            res.status(404).send({ "message": "Appointment not found" })
        }
        res.status(200).send(appoinment)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": error })
    }
}

const getAppointmentByDoctorId = async (req, res) => {
    try {
        const { doctor_id } = req.params
        const appointment = await Appointment.find({ doctor_id })
        if (!appointment) {
            res.status(404).send({ "message": "Appointment not found" })
        }
        res.status(200).send(appointment)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": error })
    }
}

const updateAppointmentById = async (req, res) => {
    try {
        const { id } = req.params
        const updateAppointment = await Appointment.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        )
        if (!updateAppointment) {
            res.status(404).send({ "message": "Appointment not found" })
        }
        res.status(200).send(updateAppointment)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": error })
    }
}

const deleteAppointmentById = async (req, res) => {
    try {
        const { id } = req.params
        const appointment = await Appointment.findByIdAndDelete(id)
        if (!appointment) {
            res.status(404).send({ "message": "Appointment not found" })
        }
        res.status(200).send({ "message": "Appointment deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": error })
    }
}


module.exports = {
    registerAppointment,
    getAllAppointments,
    getAppointmentById,
    getAppointmentByPatientId,
    getAppointmentByDoctorId,
    updateAppointmentById,
    deleteAppointmentById
}