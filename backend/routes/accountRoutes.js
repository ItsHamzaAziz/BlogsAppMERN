import express from 'express'
import UserModel from '../models/User.js'
import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express()

const salt = bycrypt.genSaltSync(10)
const secret = 'sdfab2131212nknkl767823nini2nj98'

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
                jwt.sign({username, id:user._id}, secret, {}, (err, token) => {
                    if (err) throw err
                    res.cookie('token', token).json({
                        id: user._id,
                        username
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


