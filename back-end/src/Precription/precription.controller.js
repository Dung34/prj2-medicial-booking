const Precription = require('./precription.model');

const createPrecription = async (req, res) => {
    try {
        const precription = new Precription({ ...req.body })
        await precription.save()
        res.status(200).send(precription)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": error })
    }
}

const getAllPrecriptions = async (req, res) => {
    try {
        const precriptions = await Precription.find()
        res.status(200).send(precriptions)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": error })
    }
}

const getPrecriptionById = async (req, res) => {
    try {
        const { id } = req.params
        const precription = await Precription.FindById(id)
        if (!precription) {
            res.status(404).send({ "message": "Precription not found" })
        }
        res.status(200).send(precription)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": error })
    }
}

const getPrecriptionByEMRId = async (req, res) => {
    try {
        const { emr_id } = req.params
        const precription = await Precription.findOne({ emr_id })
        if (!precription) {
            res.status(404).send({ "message": "Precription not found" })
        }
        res.status(200).send(precription)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": error })
    }
}

const updatePrecription = async (req, res) => {
    try {
        const { id } = req.params
        const precription = await Precription.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        )
        if (!precription) {
            res.status(404).send({ "message": "Precription not found" })
        }
        res.status(200).send(precription)
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": error })
    }
}

const deletePrecription = async (req, res) => {
    try {
        const { id } = req.params
        const precription = await Precription.findByIdAndDelete(id)
        if (!precription) {
            res.status(404).send({ "message": "Precription not found" })
        }
        res.status(200).send({ "message": "Precription deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": error })
    }
}

module.exports = {
    createPrecription,
    getAllPrecriptions,
    getPrecriptionById,
    getPrecriptionByEMRId,
    updatePrecription,
    deletePrecription
}