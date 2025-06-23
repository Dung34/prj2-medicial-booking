const jwt = require('jsonwebtoken')
const express = require('express')
const Patient = require('../Patients/patient.model')
const Doctor = require('../Doctors/doctor.model')
const User = require('../Model/user.model')
const router = express.Router()

// JWT secrets from environment variables
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret_key'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret_key'

// Login endpoint
router.post('/', async (req, res) => {
    const { email, password, role } = req.body
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).send({ "message": "Hiện không thấy người dùng này !!!" })
        }

        if (password === user.password) {
            // Create tokens
            const accessToken = jwt.sign(
                { userId: user._id, email: user.email, role: user.role },
                ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )
            const refreshToken = jwt.sign(
                { userId: user._id, email: user.email, role: user.role },
                REFRESH_TOKEN_SECRET,
                { expiresIn: '7d' }
            )

            // Set refresh token in httpOnly cookie
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // true in production (HTTPS)
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            })

            return res.status(200).send({
                "message": "Đăng nhập thành công !",
                "data": {
                    "accessToken": accessToken,
                    "role": user.role,
                    "userId": user._id,
                    "user": user
                }
            })
        } else {
            return res.status(401).send({ "message": "Mật khẩu không đúng !!!" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "message": "Internal server error" })
    }
})

// Refresh token endpoint
router.post('/refresh', async (req, res) => {
    const { refreshToken } = req.cookies

    if (!refreshToken) {
        return res.status(401).send({ "message": "Refresh token not found" })
    }

    try {
        // Verify refresh token
        const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)

        // Check if user still exists
        const user = await User.findById(decoded.userId)
        if (!user) {
            return res.status(401).send({ "message": "User not found" })
        }

        // Generate new access token
        const newAccessToken = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        )

        // Generate new refresh token
        const newRefreshToken = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        )

        // Set new refresh token in cookie
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        return res.status(200).send({
            "message": "Token refreshed successfully",
            "data": {
                "accessToken": newAccessToken,
                "role": user.role,
                "userId": user._id
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({ "message": "Invalid refresh token" })
    }
})

// Logout endpoint
router.post('/logout', async (req, res) => {
    try {
        // Clear the refresh token cookie
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })

        return res.status(200).send({ "message": "Đăng xuất thành công !" })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "message": "Internal server error" })
    }
})

// Register endpoint
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
            return res.status(200).send({ message: "Đăng ký người dùng thành công !!!", "data": newUser })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "message": error })
    }
})

module.exports = router