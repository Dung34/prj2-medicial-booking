const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        }
    }
)

const Doctor = mongoose.model('Doctor', doctorSchema)

module.exports = Doctor 