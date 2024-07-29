import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const AdminPosts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/admin/posts')
      .then(response => {
        setPosts(response.data)
        console.log(response.data)
      })
      .catch(err => console.error(err))
  }, [])
  

  return (
    <div className='text-center mb-10'>
      <h1>All Posts</h1>

      <p>Click on post to read, edit or delete it</p>

      {
        posts.length > 0 ? (
          <div className='space-y-2'>
            {posts.map(post => (
              <Link to={`/post/${post._id}`} className='text-black no-underline block text-xl'>
                "{post.title}" by {post.author.username}
              </Link>
            ))}
          </div>
        ) : (
          <div></div>
        )
      }
    </div>
  )
}

export default AdminPosts