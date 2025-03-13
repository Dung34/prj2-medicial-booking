const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema(
    {
        patient_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
            required: true
        },
        doctor_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            default: 'pending'
        },
        note: {
            type: String,
            required: false
        }
    }
)

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment