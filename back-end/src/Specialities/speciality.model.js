const mongoose = require('mongoose')

const specialitySchema = new mongoose.Schema(
    {
        speciality_name: {
            type: String,
            required: true,
            unique: true
        },
        title: {
            type: String,
            required: true,
            unique: true
        }
    }
)

const Speciality = mongoose.model('Speciality', specialitySchema)

module.exports = Speciality