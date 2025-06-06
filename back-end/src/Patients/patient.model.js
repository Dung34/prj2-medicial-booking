const mongoose = require('mongoose')
const Counter = require('../Counter/Counter.model')
const patientSchema = new mongoose.Schema(
    {
        _id: String,
        userId: {
            type: String,
            require: true,
        },
        sername: {
            type: String,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true
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
        address: {
            type: String,
            require: true,
        },
        addressCity: {
            type: String,
            require: true,
        },
        addressDistrict: {
            type: String,
            require: true,
        },
        status: {
            type: String,
            required: true,
            default: 'active',
        },
        contactName: {
            type: String,
        },
        contactPhoneNumber: {
            type: String,
        },
        contactRelationship: {
            type: String,
        },
        height: {
            type: String
        },
        allergy: {
            type: String
        },
        currentMedical: {
            type: String
        },
        medicalHistory: {
            type: String,
        },
        zipCode: {
            type: String
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