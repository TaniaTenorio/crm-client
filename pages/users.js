import Layout from '@/components/Layout'
import * as React from 'react'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '@/helpers/queries'
import Link from 'next/link'
import User from '@/components/User'

const Users = () => {
  const { data: usersData, loading, error } = useQuery(GET_USERS)

  if (!usersData || loading) {
    return <p>Loading ...</p>
  }

  console.log('USERS', usersData)
  return (
    <Layout>
      <h1 className='text-2xl text-gray-200 font-light'>Users</h1>
      <Link
        className='bg-blue-800 py-2 px-5 mt-3 inline-block rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold'
        href='/createaccount'
      >
        New User
      </Link>

      <table className='table-auto shadow-md mt-10 w-full w-lg'>
        <thead className='bg-gray-700'>
          <tr className='text-white'>
            <th className='w-1/3 py-2'>Name</th>
            <th className='w-1/3 py-2'>Last Name</th>
            <th className='w-1/3 py-2'>Email</th>
            <th className='w-1/3 py-2'>Rol</th>
            <th className='w-1/3 py-2'>Actions</th>
          </tr>
        </thead>

        <tbody className='bg-white'>
          {usersData?.getUsers.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default Users
