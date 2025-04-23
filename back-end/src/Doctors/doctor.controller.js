const Doctor = require("./doctor.model")
const timeOffModel = require("./timeOff.model")
const Schedule = require("./doctorSchedule.model")
const Image = require('./image.model')

const uploadImage = async (req, res) => {
    try {
        const image = req.file
        if (!req.file) {
            return res.status(404).json({ 'message': "Không tìm thấy file upload" })
        }
        const { doctor_id } = req.query
        const newImage = new Image({
            url: image.path,
            doctor_id: doctor_id,
        })
        await newImage.save()
        res.status(200).json(newImage)
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": 'Lỗi upload ảnh' });
    }
}
const registerDoctor = async (req, res) => {
    try {


        const newDoctor = await Doctor({ ...req.body })

        await newDoctor.save()
        res.status(200).send({ "message": "Doctor registered successfully", "data": newDoctor })
    } catch (error) {
        console.log(error)
        // if (error.code === 11000) {
        //     return res.status(400).send({ "message": "Email hoặc số điện thoại đã tồn tại", "error": error.code })
        // }
        res.status(500).send({ "meassage": "Đăng ký bác sĩ thất bại", "error": error.code })
    }
}
//get all doctors

const getAllDoctors = async (req, res) => {
    try {
        const { page } = req.query
        const doctors = await Doctor.find().limit(10).skip((page - 1) * 10)
        res.status(200).send(doctors)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": "Internal server error", "error": error })
    }
}
// get doctor by id 
const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params
        const doctor = await Doctor.findById(id)
        if (!doctor) {
            res.status(404).send({ "mesage": "Doctor not found" })
        }
        res.status(200).send(doctor)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": "Internal server error", "error": error })
    }
}
//update doctor by id 
const updateDoctorById = async (req, res) => {
    try {
        const { id } = req.params
        const updateDoctor = await Doctor.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        )
        if (!updateDoctor) {
            res.status(404).send({ "message": "Doctor not found" })
        }
        res.status(200).send(updateDoctor)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": "Internal server error", "error": error })
    }
}
//deleta doctor by id
const deleteDoctorById = async (req, res) => {
    try {
        const { id } = req.params
        const doctor = await Doctor.findByIdAndDelete(id)
        if (!doctor) {
            res.status(404).send({ "message": "Doctor not found" })
        }
        res.status(200).send({ "message": "Doctor deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": "Internal server error", "error": error })
    }
}

const registerTimeOff = async (req, res) => {
    try {
        const newReq = await timeOffModel({ ...req.body })
        await newReq.save()
        res.status(200).send(newReq)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "meassage": "Internal server error", "error": error })
    }
}
const accessTimeOff = async (req, res) => {
    try {
        const { _id, doctor_id } = req.body
        const doctor = await Doctor.findById(doctor_id)
        if (!doctor) {
            res.status(404).send({ "message": "Lỗi xay ra, không tìm thấy bác sĩ !!" })
        } else {

            const timeOff = await timeOffModel.findByIdAndUpdate(
                _id,
                { access: true },
                { new: true }
            );
            const schedule = await Schedule.findOneAndUpdate(
                {
                    doctor_id: doctor_id,
                    upcomingTimeOff: [...(schedule?.upcomingTimeOff || []), {
                        title: timeOff?.title || "",
                        date: timeOff?.date || ""
                    }]
                }
            )

        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Internal server error", "error": error });
    }
};
module.exports = { registerDoctor, getAllDoctors, getDoctorById, updateDoctorById, deleteDoctorById, registerTimeOff, uploadImage } 