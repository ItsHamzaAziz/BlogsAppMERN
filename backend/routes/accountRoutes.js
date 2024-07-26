import express from 'express'
import UserModel from '../models/User.js'
import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const router = express()

const salt = bycrypt.genSaltSync(10)
const secret = process.env.SECRET

router.post('/register', async (req, res) => {
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

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await UserModel.findOne({ username: username })

        if (user) {
            if (bycrypt.compareSync(password, user.password)) {
                jwt.sign({username, id:user._id, is_admin:user.is_admin}, secret, {}, (err, token) => {
                    if (err) throw err
                    res.cookie('token', token).json({
                        id: user._id,
                        username,
                        is_admin: user.is_admin
                    })
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

router.get('/profile', (req, res) => {
    try {
        const {token} = req.cookies
        jwt.verify(token, secret, {}, (err, info) => {
            if (err) throw err
            res.json(info)
        })
    } catch (error) {
        res.status(404).json(error)   
    }
})

router.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})



export default router


