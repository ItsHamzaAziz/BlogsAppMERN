import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className='flex justify-around items-center mt-4 mb-10'>
            <h1 className='font-bold text-xl'>
                <Link to={'/'}>MyBlogs</Link>
            </h1>

            <nav className='space-x-2'>
                <Link to={'/login'}>Login</Link>
                <Link to={'/register'}>Register</Link>
            </nav>
        </header>
    )
}

export default Header