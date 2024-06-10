import React from 'react'

const Login = () => {
  return (
    <>
      <form action="" className='w-1/2 mx-auto border border-gray-400 rounded-xl flex flex-col text-center space-y-4 p-5'>
        <h1 className='text-lg font-bold'>Login</h1>

        <input type="text" 
          placeholder='Your Username'
          className='px-3 py-1 border border-gray-400 rounded-lg'
        />
        <input type="password" 
          placeholder='Your Password'
          className='px-3 py-1 border border-gray-400 rounded-lg'
        />

        <button type='submit' className='bg-blue-700 text-white p-1 rounded-lg'>Submit</button>
      </form>
    </>
  )
}

export default Login