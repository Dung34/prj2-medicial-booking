const jwt = require('jsonwebtoken')
const express = require('express')
const Patient = require('../Patients/patient.model')
const Doctor = require('../Doctors/doctor.model')
const User = require('../Model/user.model')
const router = express.Router()


router.post('/', async (req, res) => {
    const { email, password, role } = req.body
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).send({ "message": "Hiện không thấy người dùng này !!!" })
        }
        else {
            if (password === user.password) {
                const accessToken = jwt.sign({ user }, 'access', { expiresIn: '15m' })
                const refreshToken = jwt.sign({ user }, 'refresh', { expiresIn: '7d' })
                return res.status(200).send({
                    "message": "Đăng nhập thành công !",
                    "data": {
                        "accessToken": accessToken,
                        "refreshToken": refreshToken,
                        "role": user.role,
                        "userId": user._id
                    }
                })
            }
        }
    } catch (error) {
        return res.status(500).send({ "message": error })
        console.log(error)
    }
    // if (email == "admin" && password == "admin") {
    //     const accessToken = jwt.sign({ email: 'admin', role: 'admin' }, 'secret', { expiresIn: '15m' })
    //     const refreshToken = jwt.sign({ email: 'admin', role: 'admin' }, 'refresh', { expiresIn: '7d' })
    //     res.status(200).send({
    //         "accessToken": accessToken,
    //         "refreshToken": refreshToken,
    //         "role": "admin",
    //         "id": 'ADMIN'
    //     })
    // } else {
    //     const patient = await Patient.findOne({ email })
    //     if (patient) {
    //         if (patient.password === password) {
    //             // generate token
    //             const accessToken = jwt.sign({ email: patient.email, role: 'patient' }, 'secret', { expiresIn: '15m' })
    //             const refreshToken = jwt.sign({ email: patient.email, role: 'patient' }, refresh, { expiresIn: '7d' })
    //             res.status(200).send({ "accessToken": accessToken, "refreshToken": refreshToken, "role": "patient", "id": patient._id })
    //             console.log("Patient logged in successfully")
    //         }
    //         else {
    //             res.status(401).send({ "message": "Wrong password" })
    //         }
    //         // if valid, generate toke
    //     }
    //     else {
    //         const doctor = await Doctor.findOne({ email })
    //         if (doctor) {
    //             if (doctor.password === password) {
    //                 // generate token
    //                 const accessToken = jwt.sign({ email: doctor.email, role: 'doctor' }, 'secret', { expiresIn: '15m' })
    //                 const refreshToken = jwt.sign({ email: doctor.email, role: 'doctor' }, refresh, { expiresIn: '7d' })
    //                 res.status(200).send({ "accessToken": accessToken, "refreshToken": refreshToken, "role": "doctor", "id": doctor._id })
    //             } else {
    //                 res.status(401).send({ "message": "Sai mật khẩu" })
    //             }
    //         } else {
    //             res.status(401).send({ "message": "Không tìm thấy người dùng" })
    //         }

    //     }
    // }
    // // check if email and password are valid

}
)

router.post('/signIn', async (req, res) => {
    const { email, password, role } = req.body
    try {
        const exitEmail = await User.findOne({ email: email })
        if (exitEmail) {
            return res.status(201).send({ message: "Đã tồn tại email này rồi !!!" })
        }
        else {
            const newUser = await User({ ...req.body })
            await newUser.save()
        }
        return res.status(200).send({ message: "Đăng ký người dùng thành công !!!" })

    } catch (error) {

    }
})


module.exports = router