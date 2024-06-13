import React, { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  const login = (e) => {
    e.preventDefault()

    axios.post('http://localhost:4000/login', { username, password }, { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          setRedirect(true)
        }
      })
      .catch(err => {
        console.log(err.response.data.message)
        alert(err.response.data.message)
      })
  }

  if (redirect) {
    return <Navigate to='/' />
  }

  return (
    <>
      <form onSubmit={login} className='w-1/2 mx-auto border border-gray-400 rounded-xl flex flex-col text-center space-y-4 p-5'>
        <h1 className='text-lg font-bold'>Login</h1>

        <input type="text" 
          placeholder='Your Username'
          className='px-3 py-1 border border-gray-400 rounded-md'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input type="password" 
          placeholder='Your Password'
          className='px-3 py-1 border border-gray-400 rounded-md'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type='submit' className='bg-blue-700 text-white p-1 rounded-md'>Submit</button>
      </form>
    </>
  )
}

export default Login