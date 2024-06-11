import React, { useState } from 'react'
import axios from 'axios'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(username, password)

    axios.post('http://localhost:4000/register', { username, password })
     .then(res => console.log(res))
     .catch(err => console.log(err))
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='w-1/2 mx-auto border border-gray-400 rounded-xl flex flex-col text-center space-y-4 p-5'>
        <h1 className='text-lg font-bold'>Register</h1>

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

export default Register