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

router.get('/users', async (req, res) => {
    try {
        res.json(
            await UserModel.find({})
                .sort({createdAt: -1})
        )
    } catch (error) {
        res.status(500).json('Error loading users')
    }
})

router.delete('/user/:id', async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id)
        res.json('User deleted successfully.')
    } catch (error) {
        res.status(404).json(error)
    }
})

router.put('/user/make-admin/:id', async (req, res) => {
    try {
        await UserModel.findByIdAndUpdate(req.params.id, { 'is_admin': true })
        res.json('User made admin successfully.')
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get('/posts', async (req, res) => {
    try {
        res.json(
            await PostModel.find({})
               .sort({ createdAt: -1 })
               .populate('author', ['username'])
        )
    } catch (error) {
        res.status(500).json('Error loading posts')
    }
})

router.get('/top-users', async (req, res) => {
    try {
        const topUsers = await PostModel.aggregate([
            // Group by author and count the number of posts per author
            {
                $group: {
                    _id: '$author',
                    postCount: { $sum: 1 }
                }
            },
            // Sort by postCount in descending order
            {
                $sort: { postCount: -1 }
            },
            // Limit to top 3 results
            {
                $limit: 3
            },
            // Lookup user details from the User collection
            {
                $lookup: {
                    from: 'users', // The collection name in MongoDB
                    localField: '_id',
                    foreignField: '_id',
                    as: 'authorDetails'
                }
            },
            // Unwind the authorDetails array
            {
                $unwind: '$authorDetails'
            },
            // Project the desired fields
            {
                $project: {
                    _id: 0,
                    // authorId: '$_id',
                    postCount: 1,
                    authorUsername: '$authorDetails.username',
                }
            }
        ])

        return res.json(topUsers)
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router

