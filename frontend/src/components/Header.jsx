import React, { useEffect, useState, useContext } from 'react'
import { Link, NavigationType } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'
import { Navigate, useNavigate } from 'react-router-dom'

const Header = () => {
    const {setUserInfo, userInfo} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:4000/profile', { withCredentials: true })
            .then((response) => {
                setUserInfo(response.data)
            })
    }, [])

    const logout = () => {
        axios.post('http://localhost:4000/logout', {}, { withCredentials: true})
            .then(() => {
                navigate('/')
                setUserInfo(null)
            })
    }

    const username = userInfo ? userInfo.username : null    

    return (
        <header className='flex justify-around items-center mt-4 mb-10'>
            <h1 className='font-bold text-xl'>
                <Link to={'/'}>MyBlogs</Link>
            </h1>

            <nav className='space-x-2'>
                {
                    username ? (
                        <>
                            <Link to={'/create-post'}>Create Post</Link>
                            <Link onClick={logout}>Logout</Link>
                        </>
                    ) : (
                        <>
                            <Link to={'/login'}>Login</Link>
                            <Link to={'/register'}>Register</Link>
                        </>
                    )
                }
            </nav>
        </header>
    )
}

export default Header