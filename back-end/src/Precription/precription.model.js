const mongoose = require('mongoose');

const PrecriptionSchema = mongoose.Schema({
    emr_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EMR',
        required: true
    },
    medication_name: {
        type: String,
        required: true
    },
    dosage: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    }
});

const Precription = mongoose.model('Precription', PrecriptionSchema);

module.exports = Precription;