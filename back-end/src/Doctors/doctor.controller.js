const Doctor = require("./doctor.model")
const timeOffModel = require("../Model/timeOff.model")
const Schedule = require("../Model/doctorSchedule.model")
const Image = require('../Model/image.model')
const eduAndCertModel = require("../Model/eduAndCert.model")
const User = require("../Model/user.model")

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
    const { fullname, phoneNumber, email, password, address, speciality_id } = req.body
    try {
        const errors = {}
        const existEmail = await Doctor.findOne({ email: email })
        if (existEmail) {
            errors.email = 'Email đã được sử dụng !'

        }

        const existPhoneNumber = await Doctor.findOne({ phoneNumber: phoneNumber })
        if (existPhoneNumber) {
            errors.phoneNumber = 'Số điện thoại đã được sử dụng'
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).send({
                message: "Thong tin bi trung",
                error: errors
            })
        }

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
            return res.status(404).send({ "message": "Doctor not found" })
        }
        return res.status(200).send(doctor)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "message": "Internal server error", "error": error })
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
        const { _id, doctor_id } = req.body;
        const doctor = await Doctor.findById(doctor_id);
        if (!doctor) {
            return res.status(404).send({ "message": "Lỗi xay ra, không tìm thấy bác sĩ !!" });
        }

        const timeOff = await timeOffModel.findByIdAndUpdate(
            _id,
            { access: true },
            { new: true }
        );

        const schedule = await Schedule.findOneAndUpdate(
            { doctor_id: doctor_id },
            {
                $push: {
                    upcomingTimeOff: {
                        title: timeOff.title || "",
                        date: timeOff.date || ""
                    }
                }
            },
            { new: true }
        );

        return res.status(200).send({ "message": "Cập nhật thành công", "timeOff": timeOff, "schedule": schedule });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ "message": "Internal server error", "error": error });
    }
};
const getDoctorSchedule = async (req, res) => {
    try {
        const { doctor_id } = req.params
        const doctor = await Doctor.findById(doctor_id)
        if (!doctor) {
            res.status(404).send({ "message": "Khong tim thay bac si nao" })
        }
        const schedule = await Schedule.findOne({ doctor_id: doctor_id })
        res.status(200).send(schedule)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": "Internal server error", "error": error })
    }
}

const getDoctorProfileImage = async (req, res) => {
    try {
        const { doctor_id } = req.query
        const doctor = await Doctor.findById(doctor_id)
        if (!doctor) {
            return res.status(404).send({ "message": "Khong tim thay bac si" })
        }
        const imageUrl = await Image.findOne({ doctor_id: doctor_id })
        return res.status(200).send({ "imageUrl": imageUrl?.url })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "message": "Internal server error", "error": error })
    }
}
const registerEduAndCert = async (req, res) => {
    try {
        const { doctor_id } = req.query
        const doctor = await Doctor.findById(doctor_id)
        if (!doctor) {
            res.status(404).send({ "message": "Khong tim thay bac si" })
        } else {
            const eduAndCert = await eduAndCertModel({ ...req.body })
            await eduAndCert.save()
            res.status(200).send({ "message": "Them thong tin thanh cong", "data": eduAndCert })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": "Internal server error", "error": error })
    }
}

const getEduAndCert = async (req, res) => {
    try {
        const { doctor_id } = req.query
        const doctor = await Doctor.findById(doctor_id)
        if (!doctor) {
            res.status(404).send({ "message": "Khong tim thay bac si" })
        } else {
            const eduAndCert = await eduAndCertModel.findOne({ doctor_id: doctor_id })
            if (!eduAndCert) {
                res.status(404).send({ "message": "Thong tin chua duoc dang ky !" })
            } else {
                res.status(200).send({ eduAndCert })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": "Internal server error", "error": error })
    }
}
const updateEduAndCert = async (req, res) => {
    try {
        const { doctor_id } = req.query
        const doctor = await Doctor.findById(doctor_id)
        if (!doctor) {
            res.status(404).send({ "message": "Khong tim thay bac si" })
        } else {
            const eduAndCert = await eduAndCertModel.findOneAndUpdate(
                { doctor_id: doctor_id },
                { ...req.body },
                { new: true }
            )
            if (!eduAndCert) {
                res.status(404).send({ "message": "Khong tim thay thong tin" })
            } else {
                res.status(200).send({ "message": "Cap nhat thong tin thanh cong", "data": eduAndCert })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": "Internal server error", "error": error })
    }
}
const getDoctorByUserId = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).send({ "message": "Khong tim thay nguoi dung nay !" })
        }
        const doctor = await Doctor.findOne({ userId: userId })
        if (!doctor) {
            return res.status(405).send({ "message": "Bac si nay chua cap nhat thong tin" })
        }
        return res.status(200).send({ "message": "Lay thong tin bac si thanh cong !", "data": doctor })

    } catch (error) {
        return res.status(500).send({ "message": error })
    }
}
const getDoctorNotVerified = async (req, res) => {
    try {
        const doctors = await Doctor.find({ isVerified: false })
        return res.status(200).send({ "message": "Lay thong tin bac si thanh cong !", "data": doctors })
    } catch (error) {
        return res.status(500).send({ "message": error })
    }
}
module.exports = {
    registerDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctorById,
    deleteDoctorById,
    registerTimeOff,
    uploadImage,
    registerEduAndCert,
    getDoctorSchedule,
    getDoctorProfileImage,
    getEduAndCert,
    updateEduAndCert,
    getDoctorByUserId,
    getDoctorNotVerified
} 