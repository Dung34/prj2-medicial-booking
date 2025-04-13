const mongoose = require('mongoose')
const Counter = require('../Counter/Counter.model')

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
        profileImage: {
            type: String,
            required: true,
        },
        availableTime: {
            type: [String],
            required: true,
            default: ["9:30 - 10:30", "10:30 - 11:30", "1:30 - 2:30", "2:30 - 3:30", "3:30 - 4:30"],
        },
        status: {
            type: String,
            required: true,
            default: 'active',
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
    }
    next();
}
)

const Doctor = mongoose.model('Doctor', doctorSchema)

module.exports = Doctor 