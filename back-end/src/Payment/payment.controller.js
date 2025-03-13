const Payment = require('./payment.model')

const createPayment = async (req, res) => {
    try {
        const payment = await Payment({ ...req.body })
        await payment.save()
        res.status(200).send({ "message": "Payment created successfully", "data": payment })
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": error })
    }
}

const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
        res.status(200).send(payments)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": error })
    }
}

const getPaymentById = async (req, res) => {
    try {
        const { id } = req.params
        const payment = await Payment.findById(id)
        if (!payment) {
            res.status(404).send({ "mesage": "Payment not found" })
        }
        res.status(200).send(payment)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": error })
    }
}

const getPaymentByAppointmentId = async (req, res) => {
    try {
        const { appointment_id } = req.params
        const payment = await Payment.findOne({ appointment_id })
        if (!payment) {
            res.status(404).send({ "mesage": "Payment not found" })
        }
        res.status(200).send(payment)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": error })
    }
}

const updatePaymentById = async (req, res) => {
    try {
        const { id } = req.params
        const updatePayment = await Payment.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        )
        if (!updatePayment) {
            res.status(404).send({ "message": "Payment not found" })
        }
        res.status(200).send(updatePayment)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": error })
    }
}

const deletePaymentById = async (req, res) => {
    try {
        const { id } = req.params
        const payment = await Payment.findByIdAndDelete(id)
        if (!payment) {
            res.status(404).send({ "message": "Payment not found" })
        }
        res.status(200).send({ "message": "Payment deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": error })
    }
}
module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    getPaymentByAppointmentId,
    updatePaymentById,
    deletePaymentById,
}