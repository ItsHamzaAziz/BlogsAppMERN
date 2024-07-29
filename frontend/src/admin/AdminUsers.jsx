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

  const deleteUser = (user) => {
    const confirmDelete = confirm(`Are you sure you want to delete ${user.username}?`)

    if (confirmDelete) {
      axios.delete(`http://localhost:4000/admin/user/${user._id}`)
       .then((response) => {
          if (response.status === 200) {
            setUsers(users.filter(u => u._id!== user._id))
            alert('Success')
          }
        })
       .catch(err => {
          console.error(err)
          alert('Cannot delete user')
        })
    }
  }

  const makeUserAdmin = (user) => {
    const confirmMakeAdmin = confirm(`Are you sure you want to make ${user.username} an admin?`) 

    if (confirmMakeAdmin) {
      axios.put(`http://localhost:4000/admin/user/make-admin/${user._id}`)
       .then((response) => {
          if (response.status === 200) {
            axios.get('http://localhost:4000/admin/users')
              .then(response => {
                setUsers(response.data)
                console.log(response.data)
              })
              .catch(err => console.error(err))
            alert('Success')
          }
        })
       .catch(err => {
          console.error(err)
          alert('Cannot make user admin')
        })
    }
  }
  

  return (
    <div className='text-center mb-10'>
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
                    <td className='border border-solid border-gray-700 py-3 px-4 rounded-lg space-x-2'>
                      <Link className='no-underline text-white bg-blue-700 px-2 py-1 rounded'>Edit</Link>
                      <span className='no-underline text-white bg-red-600 px-2 py-1 rounded cursor-pointer' onClick={() => deleteUser(user)}>Delete</span>
                      {
                        !user.is_admin ? (
                          <span className='no-underline text-white bg-green-700 px-2 py-1 rounded cursor-pointer' onClick={() => makeUserAdmin(user)}>Make Admin</span>
                        ) : (
                          <span className='no-underline text-white bg-green-700 px-2 py-1 rounded'>Already Admin</span>
                        )
                      }
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