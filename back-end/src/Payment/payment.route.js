const express = require('express')

const router = express.Router()

const { createPayment, getAllPayments, getPaymentById, updatePaymentById, deletePaymentById, getPaymentByAppointmentId } = require('./payment.controller')

router.post('/create', createPayment)

router.get('/', getAllPayments)

router.get('/:id', getPaymentById)

router.get('/appointment/:appointment_id', getPaymentByAppointmentId)

router.put('/update/:id', updatePaymentById)

router.delete('/:id', deletePaymentById)

module.exports = router