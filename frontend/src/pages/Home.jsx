import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import axios from 'axios'

const Home = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.log(error))
    }, [])
    

    return (
        <>
            {
                posts.length > 0 && (
                    posts.map(post => (
                        <Post key={post._id} {...post} />
                    ))
                )
            }
        </>
    )
}

export default Home