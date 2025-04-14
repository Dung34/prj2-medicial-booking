const Appointment = require("./appointment.model")
const Doctor = require("../Doctors/doctor.model")
const Patient = require("../Patients/patient.model")
const registerAppointment = async (req, res) => {
    try {
        const newAppointment = await Appointment({ ...req.body })
        await newAppointment.save()
        res.status(200).send(newAppointment)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": "Internal server error", "error": error })
    }
}

const getAllAppointments = async (req, res) => {
    // try {
    //     const appointments = await Appointment.find()

    //     if (!appointments) {
    //         res.status(404).send({ "message": "Không tìm thấy lịch hẹn nào" })
    //     } else {
    //         // let pendingAppoint = []
    //         // let confirmAppoint = []
    //         // let cancelledAppoint = []
    //         // for (const appointment of appointments) {
    //         //     // Perform any necessary operations on each appointment
    //         //     if (appointment.status === "pending") {
    //         //         pendingAppoint.push(appointment)
    //         //     } else {
    //         //         if (appointment.status === "confirm") {
    //         //             confirmAppoint.push(appointment)
    //         //         } else {
    //         //             cancelledAppoint.push(appointment)
    //         //         }
    //         //     }
    //         // }
    //         // res.status(200).send(
    //         //     { 'status': pending, 'appointments': pendingAppoint },
    //         //     { 'status': confirm, 'appointments': confirmAppoint },
    //         //     { 'status': cancelled, 'appointments': cancelledAppoint }
    //         // )
    //         res.status(200).send(appointments)
    //     }

    // } catch (error) {
    //     console.log(error)
    //     res.status(500).send({ "message": error })
    // }
    try {
        const appointments = await Appointment.find();

        const grouped = appointments.reduce((acc, curr) => {
            const status = curr.status || 'unknown';

            // Tìm xem nhóm status đã tồn tại chưa
            const existingGroup = acc.find((group) => group.status === status);

            if (existingGroup) {
                existingGroup.appointments.push(curr);
            } else {
                acc.push({ status, appointments: [curr] });
            }

            return acc;
        }, []);

        res.status(200).json(grouped);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách lịch hẹn', error });
    }
}

const getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params
        const appointment = await Appointment.findById(id)
        if (!appointment) {
            res.status(404).send({ "message": "Appointment not found" })
        }
        res.status(200).send(appointment)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": error })
    }
}

const getAppointmentByPatientId = async (req, res) => {
    try {
        const { patient_id } = req.params
        const appoinment = await Appointment.find({ patient_id })
        if (!appoinment) {
            res.status(404).send({ "message": "Appointment not found" })
        }
        res.status(200).send(appoinment)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": error })
    }
}

const getAppointmentByDoctorId = async (req, res) => {
    try {
        const { doctor_id } = req.params
        const appointment = await Appointment.find({ doctor_id })
        if (!appointment) {
            res.status(404).send({ "message": "Appointment not found" })
        }
        res.status(200).send(appointment)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": error })
    }
}

const updateAppointmentById = async (req, res) => {
    try {
        const { id } = req.params
        const updateAppointment = await Appointment.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        )
        if (!updateAppointment) {
            res.status(404).send({ "message": "Appointment not found" })
        }
        res.status(200).send(updateAppointment)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": error })
    }
}

const deleteAppointmentById = async (req, res) => {
    try {
        const { id } = req.params
        const appointment = await Appointment.findByIdAndDelete(id)
        if (!appointment) {
            res.status(404).send({ "message": "Appointment not found" })
        }
        res.status(200).send({ "message": "Appointment deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": error })
    }
}


module.exports = {
    registerAppointment,
    getAllAppointments,
    getAppointmentById,
    getAppointmentByPatientId,
    getAppointmentByDoctorId,
    updateAppointmentById,
    deleteAppointmentById
}