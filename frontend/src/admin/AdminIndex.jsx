import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const AdminIndex = () => {
  const [topUsers, setTopUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/admin/top-users')
      .then(response => {
        setTopUsers(response.data)
        console.log(response.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])
  

  return (
    <div className='text-center'>
      <h1 className='text-xl'>Top 3 users</h1>
      {
        topUsers.length > 0 ? (
          topUsers.map(user => (
            <div key={user.authorUsername}>
              {user.authorUsername} has { user.postCount } posts
            </div>
          ))
        ) : (
          <div>No top users found.</div>
        )
      }
    </div>
  )
}

export default AdminIndex