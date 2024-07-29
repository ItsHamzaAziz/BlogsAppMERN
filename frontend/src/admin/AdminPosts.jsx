import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

      {
        posts.length > 0 ? (
          <div>
            {posts.map(post => (
              <div key={post._id} className='text-xl'>
                "{post.title}" by {post.author.username}
              </div>
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