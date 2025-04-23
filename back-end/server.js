const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000
// connect database

const uri = process.env.DATABASE_URL || "mongodb+srv://dungwork203:Hg1Fh7sxTuRT0vhE@cluster0.zoyjs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await mongoose.disconnect();
    }
}
run().catch(console.dir);
//middleware
app.use(express.json())
app.use(cors())

//routes
const doctorRoute = require('./src/Doctors/doctor.route')
const patientRoute = require('./src/Patients/patient.route')
const appointmentRoute = require('./src/Appointment/appointment.route')
const emrRoute = require('./src/EMR/emr.route')
const paymentRoute = require('./src/Payment/payment.route')
const precriptionRoute = require('./src/Precription/precription.route')
const testResultRoute = require('./src/TestResult/testResult.route')
const specialityRoute = require('./src/Specialities/speciality.route')
const authRoute = require('./src/Auth/auth.route')
app.use('/api/doctor', doctorRoute)
app.use('/api/patient', patientRoute)
app.use('/appointment', appointmentRoute)
app.use('/emr', emrRoute)
app.use('/payment', paymentRoute)
app.use('/precription', precriptionRoute)
app.use('/testResult', testResultRoute)
app.use('/speciality', specialityRoute)
app.use('/login', authRoute)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})