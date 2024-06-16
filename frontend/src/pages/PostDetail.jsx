import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'
import { Link } from 'react-router-dom'

const PostDetail = () => {
    const {id} = useParams()
    const [post, setPost] = useState({})
    const [username, setUsername] = useState('')
    const [userId, setUserId] = useState(null)

    const {userInfo} = useContext(UserContext)

    useEffect(() => {
        axios.get(`http://localhost:4000/post/${id}`)
            .then(response => {
                setPost(response.data)
                setUsername(response.data.author.username)
                setUserId(response.data.author._id)
            })
    }, [])
    

    return (
        <div className='w-1/2 mx-auto mb-10'>
            <img 
                src={'http://localhost:4000/' + post.image}
                alt=""
                className='w-full h-72 rounded-xl mb-5'
            />



            <h1 className='text-3xl font-bold text-center mb-5'>{post.title}</h1>
            <p className='text-center'>by {username}</p>
            <p className='text-center mb-5'>{new Date(post.createdAt).toDateString()}</p>

            {
                userId === userInfo.id && (
                    <div className='text-center space-x-3'>
                        <Link to={`/edit/${post._id}`}>
                            <button className='border-none bg-blue-700 text-white px-3 py-2 rounded-md cursor-pointer'>Edit</button>
                        </Link>
                        <button className='border-none bg-red-600 text-white px-3 py-2 rounded-md cursor-pointer'>Delete</button>
                    </div>
                )
            }

            <div dangerouslySetInnerHTML={{__html: post.content}} />
        </div>
    )
}

export default PostDetail