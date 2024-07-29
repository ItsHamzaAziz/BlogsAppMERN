import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const AdminUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/admin/users')
      .then(response => {
        setUsers(response.data)
        console.log(response.data)
      })
      .catch(err => console.error(err))
  }, [])
  

  return (
    <div className='text-center'>
      <h1>All Users</h1>

      {
        users.length > 0 ? (
          <table className='w-auto mx-auto border-spacing-2'>
            <thead>
              <tr>
                <th className='border border-solid border-gray-700 py-2 px-10 rounded-lg'>Username</th>
                <th className='border border-solid border-gray-700 py-2 px-4 rounded-lg'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map(user => (
                  <tr key={user._id}>
                    <td className='border border-solid border-gray-700 py-2 px-10 rounded-lg'>{user.username}</td>
                    <td className='border border-solid border-gray-700 py-2 px-4 rounded-lg space-x-2'>
                      <Link className='no-underline text-white bg-blue-700 px-2 py-1 rounded'>Edit</Link>
                      <Link className='no-underline text-white bg-red-600 px-2 py-1 rounded'>Delete</Link>
                      {
                        !user.is_admin ? (
                          <Link className='no-underline text-white bg-green-700 px-2 py-1 rounded'>Make Admin</Link>
                        ) : (
                          <span className='no-underline text-white bg-green-700 px-2 py-1 rounded'>Already Admin</span>
                        )
                      }
                      {/* <Link className='no-underline text-white bg-green-700 px-2 py-1 rounded'>
                        {
                          user.is_admin ? 'Admin' : 'Make Admin'
                        }
                      </Link> */}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        ) : (
          <p>No users found</p>
        )
      }
    </div>
  )
}

export default AdminUsers