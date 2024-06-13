import express from 'express';
import cors from 'cors';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import UserModel from './models/User.js';
import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const salt = bycrypt.genSaltSync(10)
const secret = 'sdfab2131212nknkl767823nini2nj98'

const app = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(express.json())

mongoose.connect(mongoDBURL)

app.post('/register', async (req, res) => {
    try {
        const {username, password} = req.body
        const newUser = await UserModel.create({ 
            username: username, 
            password: bycrypt.hashSync(password, salt)
        })
        res.json(newUser)
    } catch (error) {
        res.status(404).json(error)   
    }
})

app.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await UserModel.findOne({ username: username })

        if (user) {
            if (bycrypt.compareSync(password, user.password)) {
                jwt.sign({username, id:user._id}, secret, {}, (err, token) => {
                    if (err) throw err
                    res.cookie('token', token).json('ok')
                })
            } else {
                res.status(400).json({ message: 'Invalid Password' })
            }
        } else {
            res.status(404).json({ message: 'Invalid Username' })
        }
    } catch (error) {
        res.status(404).json(error)   
    }
})


app.listen(PORT)

