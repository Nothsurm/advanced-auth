import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
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
});

router.post('/forgotPassword', async (req, res) => {
    const {email} = req.body
    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.json({ message: 'User hasnt been registered' })
        }

        const token = jwt.sign({id: user._id}, process.env.VITE_TOKEN, {expiresIn: '10m'})

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'mrush94ton@gmail.com',
              pass: 'axos pzyp omor wphc'
            }
          });
          
        var mailOptions = {
            from: 'mrush94ton@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:5173/resetPassword/${token}`
          };
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return res.json({ message: 'error sending Email'})
            } else {
                return res.json({ success: true, message: 'Email Sent'})
            }
        });
    } catch (error) {
        console.log(err)
    }
});

router.post('/resetPassword/:token', async (req, res) => {
    const {token} = req.params;
    const {password} = req.body

    try {
        const decoded = await jwt.verify(token, process.env.VITE_TOKEN)
        const id = decoded.id;
        console.log(id);
        console.log(decoded);
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.findByIdAndUpdate({_id: id}, {password: hashedPassword})
        return res.json({ status: true, message: "Updated Password Successfully"})

    } catch (err) {
        return res.json('Invalid token')
    }
})

export {router as UserRouter}