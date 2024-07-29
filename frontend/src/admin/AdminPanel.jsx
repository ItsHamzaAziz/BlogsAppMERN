import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'

const AdminPanel = ({ children }) => {
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
            <h1 className='text-3xl text-center mb-10 font-bold'>Admin Panel</h1>

            <div className='flex space-x-3 justify-center text-lg'>
                <div className='bg-blue-800 text-white px-5 py-3 rounded-lg'>Total Users: {usersCount}</div>
                <div className='bg-green-700 text-white px-5 py-3 rounded-lg'>Total Posts: {postsCount}</div>
            </div>

            <div className='mt-10 mx-10'>
                <div className='text-center space-x-5 py-5 bg-gray-800 space-y-4 rounded-lg'>
                    <Link to={'/admin'} className='text-white no-underline'>Home</Link>
                    <Link to={'/admin/all-users'} className='text-white no-underline'>All Users</Link>
                    <Link to={'/admin/all-posts'} className='text-white no-underline'>All Posts</Link>
                </div>

                
                <Outlet />
            </div>
        </div>
    )
}

export default AdminPanel