import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

mongoose.connect(process.env.VITE_MONGODB).then(() => {
    console.log('connected to Mongo DB');
}).catch((err) => {
    console.log(err);
})

app.listen(process.env.VITE_PORT, () => {
    console.log('Server is running');
})