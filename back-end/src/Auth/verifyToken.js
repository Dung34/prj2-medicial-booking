const jwt = require('jsonwebtoken')

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret_key'

const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) return res.status(401).send('Access Denied')

    try {
        const verified = jwt.verify(token, ACCESS_TOKEN_SECRET)
        req.user = verified // Add user info to request object
        next()
    } catch (error) {
        console.log('Token verification error:', error.message)
        res.status(401).send('Invalid Token')
    }
}

module.exports = verifyToken