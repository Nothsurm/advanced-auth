import express from 'express'
import bcrypt from 'bcrypt'
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
    return res.json({ message: 'You have successfully registered'})
})

export {router as UserRouter}