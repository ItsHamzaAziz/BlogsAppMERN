import express from 'express'
import dotenv from 'dotenv'
import UserModel from '../models/User.js'
import PostModel from '../models/Post.js'

dotenv.config()

const router = express()

router.get('/', async (req, res) => {
    const usersCount = await UserModel.countDocuments({})
    const postsCount = await PostModel.countDocuments({})

    res.json({ usersCount: usersCount, postsCount: postsCount })
})

export default router

