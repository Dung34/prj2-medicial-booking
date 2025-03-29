const Speciality = require('./speciality.model')

const Doctor = require('../Doctors/doctor.model')
const Speciality_Doctor = require('./speciality-doctor.model')

const createSpeciality = async (req, res) => {
    try {
        const speciality = await Speciality({ ...req.body })
        await speciality.save()
        res.status(200).send({ "message": "Speciality created successfully", "data": speciality })
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": error })
    }

}

const addSpecialityToDoctor = async (req, res) => {
    try {
        const { doctorId, specialityId, speciality_name } = req.body
        const doctor = await Doctor.findById(doctorId)

        if (!doctor) {
            res.status(404).send({ "message": "Doctor not found" })
        } else {
            const speciality = await Speciality.findById(specialityId)
            if (!speciality) {
                res.status(404).send({ "message": "Speciality not found" })
            }
            else {
                const speciality_Doctor = await Speciality_Doctor({ ...req.body })
                await speciality_Doctor.save()
                res.status(200).send({ "message": "Speciality added to doctor successfully", "data": Speciality_Doctor })
            }
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": error })
    }
}

const getAllSpecialities = async (req, res) => {
    try {
        const specialities = await Speciality.find()
        res.status(200).send(specialities)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": error })
    }
}

const deleteSpecialitybyID = async (req, res) => {
    try {
        const { id } = req.params
        const speciality = await Speciality.findById(id)
        if (!speciality) {
            res.status(404).send({ "message": "Speciality not found" })
        }
        else {
            await Speciality.findByIdAndDelete(id)
            res.status(200).send({ "message": "Speciality deleted successfully" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": error })
    }
}

const searchSpecialitybyId = async (req, res) => {
    try {
        const { id } = req.params
        const speciality = await Speciality.findById(id)
        if (!speciality) {
            res.status(404).send({ "message": "Speciality not found" })
        }
        else {
            res.status(200).send(speciality)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": error })
    }
}

const searchSpecialitybyDoctorId = async (req, res) => {
    try {
        const { doctor_id } = req.params
        const specialities_doctor = await Speciality_Doctor.find({ doctor_id })
        if (specialities_doctor.length === 0) {
            res.status(404).send({ "message": "Doctor don't have any speciality" })
        }
        else {
            res.status(200).send(specialities_doctor)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": error })
    }
}

const getDocBySpecialityName = async (req, res) => {
    try {
        const { speciality_name } = req.params
        const specialities_doctor = await Speciality_Doctor.find({ speciality_name })

        if (specialities_doctor.length === 0) {
            res.status(404).send({ "message": "Speciality don't have any doctor" })
        }
        else {
            const doctorIds = specialities_doctor.map(doc => doc.doctorId)
            const doctors = await Doctor.find({ _id: { $in: doctorIds } })
            res.status(200).send(doctors)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": error })
    }
}
module.exports = {
    createSpeciality,
    addSpecialityToDoctor,
    getAllSpecialities,
    deleteSpecialitybyID,
    searchSpecialitybyId,
    searchSpecialitybyDoctorId,
    getDocBySpecialityName,
}