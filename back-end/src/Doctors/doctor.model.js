const mongoose = require('mongoose')
const Counter = require('../Counter/Counter.model')
const Schedule = require('./doctorSchedule.model.js')
const Image = require('./image.model.js')
const doctorSchema = new mongoose.Schema(
    {
        _id: String,
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
        },
        education: {
            type: String, required: true
        },
        decription: {
            type: String, required: true
        },
        status: {
            type: String,
            required: true,
            default: 'active',
        },
        languages: {
            type: [String],
            required: false,
        }
    }
)

doctorSchema.pre('save', async function (next) {
    const doc = this
    if (doc.isNew) {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'doctorId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        const paddedId = String(counter.seq).padStart(3, '0'); // 001, 002,...
        doc._id = `DOC${paddedId}`;
        const schedule = await Schedule({
            doctor_id: doc._id
        })
        await schedule.save()
    }
    next();
}
)

const Doctor = mongoose.model('Doctor', doctorSchema)

module.exports = Doctor 