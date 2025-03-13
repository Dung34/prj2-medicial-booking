const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    appointment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    payment_method: {
        type: String,
        required: true,
        default: "cast"
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    },
    paid_at: {
        type: Date,
        required: false,
    }
})

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment