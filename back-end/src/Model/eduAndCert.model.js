const mongoose = require('mongoose')

const certification = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    }
})

const educationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    }
})

const eduAndCert = new mongoose.Schema({
    doctor_id: {
        type: String,
        required: true,
    },
    educations: [educationSchema],
    certifications: [certification]
})

module.exports = mongoose.model('EduAndCert', eduAndCert)
