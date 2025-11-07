const mongoose = require('mongoose')

const emrImageSchema = new mongoose.Schema({
    appointment_id: {
        type: String,
        require: true,
    },
    urls: [{
        type: String,
        require: true,
    }]
})

module.exports = mongoose.model('emrImage', emrImageSchema)