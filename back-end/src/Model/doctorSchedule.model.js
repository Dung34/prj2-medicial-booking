const mongoose = require('mongoose');

const WorkingHourSchema = new mongoose.Schema({
    day: { type: String, required: true },
    time: { type: String, required: true }
});

const TimeOffSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: {
        type: Date,
        required: true
    }
});

const ScheduleSchema = new mongoose.Schema({
    doctor_id: {
        type: String,
        required: true,
    },
    workingHours: {
        type: [WorkingHourSchema],
        default: [
            { day: "Thứ hai", time: "08:00 - 17:00" },
            { day: "Thứ ba", time: "08:00 - 17:00" },
            { day: "Thứ tư", time: "08:00 - 17:00" },
            { day: "Thứ năm", time: "08:00 - 17:00" },
            { day: "Thứ sáu", time: "08:00 - 15:00" },
            { day: "Thứ bảy", time: "Off" },
            { day: "Chủ nhật", time: "Off" },
        ]
    },
    upcomingTimeOff: [TimeOffSchema],
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
