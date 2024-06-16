import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import axios from 'axios'

const Home = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/post/all-posts')
            .then(response => setPosts(response.data))
            .catch(error => console.log(error))
    }, [])
    

    return (
        <>
            {
                posts.length > 0 ? (
                    posts.map(post => (
                        <Post key={post._id} {...post} />
                    ))
                ) : (
                    <h1 className='text-center text-2xl'>No posts yet</h1>
                )
            }
        </>
    )
}

export default Home