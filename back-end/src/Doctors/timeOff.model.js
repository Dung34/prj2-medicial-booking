const mongoose = require('mongoose')

const timeOff = new mongoose.Schema({
    doctor_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        reuired: true,
    },
    date: {
        type: Date,
        reuired: true,
    },
    reason: {
        type: String,
        required: true,
    },
    access: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('TimeOff', timeOff)