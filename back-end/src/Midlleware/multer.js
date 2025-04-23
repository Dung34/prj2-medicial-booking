const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('../config/cloudinary.config')

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'clinic_images',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 800, height: 800, crop: 'limit' }],
    }
})

const uploadToCloud = multer({ storage: storage })

module.exports = uploadToCloud