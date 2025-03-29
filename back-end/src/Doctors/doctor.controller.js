const Doctor = require("./doctor.model")

const registerDoctor = async (req, res) => {
    try {
        const newBook = await Doctor({ ...req.body })
        await newBook.save()
        res.status(200).send({ "message": "Doctor registered successfully", "data": newBook })
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": "Internal server error", "error": error })
    }
}
//get all doctors

const getAllDoctors = async (req, res) => {
    try {
        const { page } = req.query
        const doctors = await Doctor.find().limit(10).skip((page - 1) * 10)
        res.status(200).send(doctors)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": "Internal server error", "error": error })
    }
}
// get doctor by id 
const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params
        const doctor = await Doctor.findById(id)
        if (!doctor) {
            res.status(404).send({ "mesage": "Doctor not found" })
        }
        res.status(200).send(doctor)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": "Internal server error", "error": error })
    }
}
//update doctor by id 
const updateDoctorById = async (req, res) => {
    try {
        const { id } = req.params
        const updateDoctor = await Doctor.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        )
        if (!updateDoctor) {
            res.status(404).send({ "message": "Doctor not found" })
        }
        res.status(200).send(updateDoctor)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": "Internal server error", "error": error })
    }
}
//deleta doctor by id
const deleteDoctorById = async (req, res) => {
    try {
        const { id } = req.params
        const doctor = await Doctor.findByIdAndDelete(id)
        if (!doctor) {
            res.status(404).send({ "message": "Doctor not found" })
        }
        res.status(200).send({ "message": "Doctor deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": "Internal server error", "error": error })
    }
}
module.exports = { registerDoctor, getAllDoctors, getDoctorById, updateDoctorById, deleteDoctorById } 