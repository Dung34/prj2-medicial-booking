const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    doctor_id: {
        type: String,
        require: true,
    },
    url: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model('Image', imageSchema)