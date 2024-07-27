import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

const AdminPanel = () => {
    const [usersCount, setUsersCount] = useState(0)
    const [postsCount, setPostsCount] = useState(0)

    useEffect(() => {
        axios.get('http://localhost:4000/admin/')
            .then(response => {
                setUsersCount(response.data.usersCount)
                setPostsCount(response.data.postsCount)
            })
    }, [])
    

    return (
        <div>
            <h1 className='text-xl text-center mb-4 font-bold'>Admin Panel</h1>

            <div className='flex space-x-3 justify-center'>
                <div className='bg-blue-800 text-white px-5 py-3 rounded-lg'>Total Users: {usersCount}</div>
                <div className='bg-green-700 text-white px-5 py-3 rounded-lg'>Total Posts: {postsCount}</div>
            </div>
        </div>
    )
}

export default AdminPanel