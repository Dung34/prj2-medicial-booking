const mongoose = require('mongoose');

const TestResultSchema = mongoose.Schema({
    emr_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EMR',
        required: true
    },
    create_date: {
        type: Date,
        required: true
    },
    test_name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
})

const TestResult = mongoose.model('TestResult', TestResultSchema);

module.exports = TestResult;