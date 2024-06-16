import express from 'express'
import multer from 'multer'
import PostModel from '../models/Post.js'
import fs from 'fs';
import jwt from 'jsonwebtoken'

const router = express()

const uploadMiddleware = multer({ dest: 'uploads/' })

const secret = 'sdfab2131212nknkl767823nini2nj98'

router.post('/create-post', uploadMiddleware.single('image'), (req, res) => {
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

router.put('/:id', uploadMiddleware.single('image'), async (req, res) => {
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

router.get('/all-posts', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
    try {
        await PostModel.findByIdAndDelete(req.params.id)
        res.status(200).json('Post deleted successfully.')
    } catch (error) {
        res.status(404).json(error)   
    }
})

router.get('/:id', async (req, res) => {
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


export default router


