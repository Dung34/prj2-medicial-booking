const mongoose = require('mongoose')
const Counter = require('../Counter/Counter.model')
const emrSchema = new mongoose.Schema({
    _id: String,
    appoinment_id: {
        type: String,
        required: true
    },
    symptom: {
        type: String,

    },
    diagnose: {
        type: String,
    },
    treatment: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    decription: {
        type: String
    }
})
emrSchema.pre('save', async function (next) {
    const doc = this
    if (doc.isNew) {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'emrId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        const paddedId = String(counter.seq).padStart(3, '0'); // 001, 002,...
        doc._id = `EMR${paddedId}`;
    }
    next();
}
)
const EMR = mongoose.model('EMR', emrSchema)

module.exports = EMR