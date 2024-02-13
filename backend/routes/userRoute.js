import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'

const router = express.Router()

router.post('/signup', async (req, res) => {
    const {username, email, password} = req.body
    const userExists = await User.findOne({email})
    if (userExists) {
        return res.json({ message: 'user already exists' })
    }

    if (!username || !email || !password) {
        return res.json({ message: 'Please fill in all fields'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })

    await newUser.save()
    return res.json({ status: true, message: 'You have successfully registered'})
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (!user) {
        return res.json({ message: 'User does not exist'})
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return res.json({ message: 'Password is invalid'})
    }

    const token = jwt.sign({username: user.username}, process.env.VITE_TOKEN, {expiresIn: '24h'})
    res.cookie('token', token, {httpOnly: true, maxAge: 360000})
    return res.json({ status: true, message: 'Login Successfull'})
})

export {router as UserRouter}