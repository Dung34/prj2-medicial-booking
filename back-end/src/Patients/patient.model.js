const mongoose = require('mongoose')
const Counter = require('../Counter/Counter.model')
const patientSchema = new mongoose.Schema(
    {
        _id: String,
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

        },
        note: {
            type: [String],
        },
        status: {
            type: String,
            required: true,
            default: 'active',
        }
    }
)

patientSchema.pre('save', async function (next) {
    const doc = this
    if (doc.isNew) {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'patientId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        const paddedId = String(counter.seq).padStart(3, '0'); // 001, 002,...
        doc._id = `PAT${paddedId}`;
    }
    next();
}
)

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient