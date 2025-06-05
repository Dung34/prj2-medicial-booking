const mongoose = require('mongoose')
const Counter = require('../Counter/Counter.model')
const userSchema = new mongoose.Schema(
    {
        _id: String,
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true
        },
        role: {
            type: String,
            default: 'patient'
        }
    }
)

userSchema.pre('save', async function (next) {
    const doc = this
    if (doc.isNew) {
        const counter = await Counter.findByIdAndUpdate(
            {
                _id: 'userId'
            },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        )
        const paddedId = String(counter.seq).padStart(3, '0')

        doc._id = `USER${paddedId}`

    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User