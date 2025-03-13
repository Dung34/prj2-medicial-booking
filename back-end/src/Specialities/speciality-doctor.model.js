const mongoose = require('mongoose')

const speciality_doctorSchema = new mongoose.Schema(
    {
        doctor_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true
        },
        speciality_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Speciality',
            required: true
        }
    }
)

const Speciality_Doctor = mongoose.model('Speciality_Doctor', speciality_doctorSchema)

module.exports = Speciality_Doctor