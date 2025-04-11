const mongoose = require('mongoose')
const Counter = require('../Counter/Counter.model')

const appointmentSchema = new mongoose.Schema(
    {
        _id: String,
        patient_id: {
            type: String,
            required: true
        },
        doctor_id: {
            type: String,
            required: true
        },
        date: {
            type: String,
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
appointmentSchema.pre('save', async function (next) {
    const doc = this
    if (doc.isNew) {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'appointmentId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        const paddedId = String(counter.seq).padStart(3, '0'); // 001, 002,...
        doc._id = `APP${paddedId}`;
    }
    next();
}

)

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment