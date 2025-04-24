const Speciality = require('./speciality.model')
const Doctor = require('../Doctors/doctor.model')


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


const getDocBySpecialityName = async (req, res) => {
    try {
        const { speciality_id } = req.params
        const doctors = await Doctor.find({ speciality_id: speciality_id })

        if (doctors.length === 0) {
            res.status(404).send({ "message": "Chuyên khoa không có bác sĩ nào !" })
        }
        else {
            res.status(200).send(doctors)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": error })
    }
}
module.exports = {
    createSpeciality,
    getAllSpecialities,
    deleteSpecialitybyID,
    searchSpecialitybyId,
    getDocBySpecialityName,
}