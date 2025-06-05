const mongoose = require('mongoose')

const emrImageSchema = new mongoose.Schema({
    appointment_id: {
        type: String,
        require: true,
    },
    url: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model('emrImage', emrImageSchema)