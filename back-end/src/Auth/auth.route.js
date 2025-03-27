const jwt = require('jsonwebtoken')
const express = require('express')
const Patient = require('../Patients/patient.model')
const Doctor = require('../Doctors/doctor.model')
const router = express.Router()

router.post('/', async (req, res) => {
    const { email, password } = req.body
    // check if email and password are valid
    const patient = await Patient.findOne({ email })
    if (patient) {
        if (patient.password === password) {
            // generate token
            const token = jwt.sign({ email: patient.email, role: 'patient' }, 'secret')
            res.status(200).send({ "token": token, "role": "patient", "id": patient._id })
            console.log("Patient logged in successfully")
        }
        else {
            res.status(401).send({ "message": "Wrong password" })
        }
        // if valid, generate toke
    }
    else {
        const doctor = await Doctor.findOne({ email })
        if (doctor) {
            if (doctor.password === password) {
                // generate token
                const token = jwt.sign({ email: doctor.email, role: 'doctor' }, 'secret')
                res.status(200).send({ "token": token, "role": "doctor" })
            } else {
                res.status(401).send({ "message": "Wrong password" })
            }
        } else {
            res.status(401).send({ "message": "User not found" })
        }

    }
}
)



module.exports = router