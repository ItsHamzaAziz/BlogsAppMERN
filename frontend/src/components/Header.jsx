import React, { useEffect, useState, useContext } from 'react'
import { Link, NavigationType } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const {setUserInfo, userInfo} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:4000/account/profile', { withCredentials: true })
            .then((response) => {
                setUserInfo(response.data)
            })
    }, [])

    const logout = () => {
        axios.post('http://localhost:4000/account/logout', {}, { withCredentials: true})
            .then(() => {
                navigate('/')
                setUserInfo(null)
            })
    }


    const username = userInfo ? userInfo.username : null  
    const is_admin = userInfo ? userInfo.is_admin : null
    

    return (
        <header className='flex justify-around items-center mt-4 mb-10'>
            <h1 className='font-bold text-xl'>
                <Link to={'/'} className='text-black no-underline'>MyBlogs</Link>
            </h1>

            <nav className='space-x-2'>
                {
                    username ? (
                        <>
                            <Link to={'/create-post'} className='text-black no-underline'>Create Post</Link>
                            <Link onClick={logout} className='text-black no-underline'>Logout</Link>
                        </>
                    ) : (
                        <>
                            <Link to={'/login'} className='text-black no-underline'>Login</Link>
                            <Link to={'/register'} className='text-black no-underline'>Register</Link>
                        </>
                    )
                }
                {
                    is_admin && (
                        <Link to={'/admin'} className='text-black no-underline'>Admin Panel</Link>
                    )
                }
            </nav>
        </header>
    )
}

export default Header