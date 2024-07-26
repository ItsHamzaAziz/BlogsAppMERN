import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  const {setUserInfo} = useContext(UserContext)

  const login = (e) => {
    e.preventDefault()

    axios.post('http://localhost:4000/account/login', { username, password }, { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          setUserInfo(res.data)
          setRedirect(true)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  if (redirect) {
    return <Navigate to='/' />
  }

  return (
    <>
      <h1 className='text-xl text-center mb-4 font-bold'>Login</h1>

      <form onSubmit={login} className='w-1/2 mx-auto border border-solid border-gray-400 rounded-xl flex flex-col text-center space-y-4 p-7'>

        <input type="text" 
          placeholder='Your Username'
          className='px-3 py-2 rounded-md border border-solid border-gray-400'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input type="password" 
          placeholder='Your Password'
          className='px-3 py-2 rounded-md border border-solid border-gray-400'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type='submit' className='bg-blue-700 text-white p-2 rounded-md cursor-pointer border-none'>Submit</button>
      </form>
    </>
  )
}

export default Login