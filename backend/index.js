import express from 'express';
import cors from 'cors';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import UserModel from './models/User.js';

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(mongoDBURL)

app.post('/register', async (req, res) => {
    try {
        const {username, password} = req.body
        const newUser = await UserModel.create({ username: username, password: password })
        res.json(newUser)
    } catch (error) {
        res.status(404).json(error)   
    }
})

app.listen(PORT)

