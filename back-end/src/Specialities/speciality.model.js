const mongoose = require('mongoose')
const Counter = require('../Counter/Counter.model')

const specialitySchema = new mongoose.Schema(
    {
        _id: String,
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

specialitySchema.pre('save', async function (next) {
    const doc = this
    if (doc.isNew) {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'speciality' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        )
        const paddedId = String(counter.seq).padStart(3, '0')
        doc._id = `SPE${paddedId}`
    }
    next();
})

const Speciality = mongoose.model('Speciality', specialitySchema)

module.exports = Speciality