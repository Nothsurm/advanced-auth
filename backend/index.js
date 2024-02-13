import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { UserRouter } from './routes/userRoute.js';

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(cookieParser())

mongoose.connect(process.env.VITE_MONGODB).then(() => {
    console.log('connected to Mongo DB');
}).catch((err) => {
    console.log(err);
})

app.use('/auth', UserRouter)

app.listen(process.env.VITE_PORT, () => {
    console.log('Server is running');
})