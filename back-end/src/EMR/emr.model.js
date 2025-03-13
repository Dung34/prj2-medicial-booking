const mongoose = require('mongoose')

const emrSchema = new mongoose.Schema({
    appoinment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appoinment',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    }
})

const EMR = mongoose.model('EMR', emrSchema)

module.exports = EMR