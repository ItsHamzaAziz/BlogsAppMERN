import express from 'express';
import cors from 'cors';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import UserModel from './models/User.js';
import PostModel from './models/Post.js';
import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

const salt = bycrypt.genSaltSync(10)
const secret = 'sdfab2131212nknkl767823nini2nj98'

const uploadMiddleware = multer({ dest: 'uploads/' })

const app = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

app.get('/profile', (req, res) => {
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

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})

app.post('/create-post', uploadMiddleware.single('image'), (req, res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]

    const newPath = path+'.'+ext

    fs.renameSync(path, newPath)

    const {token} = req.cookies

    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err
        const {title, summary, content} = req.body
    
        const newPost = await PostModel.create({
            title: title,
            summary: summary,
            content: content,
            // image: path+'.'+ext
            image: newPath,
            author: info.id
        })

        res.json(newPost)
    })
})

app.put('/post/:id', uploadMiddleware.single('image'), async (req, res) => {
    try {
        const {id} = req.params
        const {title, summary, content} = req.body

        if (req.file) {
            const {originalname, path} = req.file;
            const parts = originalname.split('.')
            const ext = parts[parts.length - 1]

            const newPath = path+'.'+ext

            fs.renameSync(path, newPath)

            const updatedPost = await PostModel.findByIdAndUpdate(id, {
                title: title,
                summary: summary,
                content: content,
                image: newPath
            })
            res.status(200).json(updatedPost)
        } else {
            const updatedPost = await PostModel.findByIdAndUpdate(id, {
                title: title,
                summary: summary,
                content: content
            })
            res.status(200).json(updatedPost)
        }
    } catch (err) {
        res.status(404).json(err)
    }
})


app.get('/posts', async (req, res) => {
    try {
        res.json(
            await PostModel.find()
                .populate('author', ['username'])
                .sort({createdAt: -1})  // Recently created first
                .limit(20)
        )
    } catch (error) {
        res.status(404).json(error)   
    }
})

app.get('/post/:id', async (req, res) => {
    try {
        // const {id} = req.params.id
        res.json(
            await PostModel.findById(req.params.id)
               .populate('author', ['username'])
        )
    } catch (error) {
        res.status(404).json(error)   
    }
})


app.listen(PORT)

