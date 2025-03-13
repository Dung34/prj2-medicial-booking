const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        identificationNumber: {
            type: String,
            required: true,
        },
        bloodType: {
            type: String,
            required: true,
        }
    }
)

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient