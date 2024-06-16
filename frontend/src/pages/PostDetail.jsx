import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'

const PostDetail = () => {
    const {id} = useParams()
    const [post, setPost] = useState({})
    const [username, setUsername] = useState('')



    useEffect(() => {
        axios.get(`http://localhost:4000/post/${id}`)
            .then(response => {
                setPost(response.data)
                setUsername(response.data.author.username)
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
            <div dangerouslySetInnerHTML={{__html: post.content}} />
        </div>
    )
}

export default PostDetail