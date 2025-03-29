const mongoose = require('mongoose')

const speciality_doctorSchema = new mongoose.Schema(
    {
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true
        },
        specialityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Speciality',
            required: true
        },
        speciality_name: {
            type: String,
            required: true
        },
    }
)

const Speciality_Doctor = mongoose.model('Speciality_Doctor', speciality_doctorSchema)

module.exports = Speciality_Doctor