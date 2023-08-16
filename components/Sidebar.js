import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GET_USER } from '@/helpers/queries'

const Sidebar = () => {
  const router = useRouter()

  const { data, loading, client } = useQuery(GET_USER)

  if (loading && !data?.getUser) {
    return null
  }

  const logout = () => {
    localStorage.removeItem('token')
    client.clearStore()
    router.push('/login')
  }

  return (
    <aside className='flex flex-col bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5 justify-between'>
      <div>
        <p className='text-2xl font-bold  '>CRM Clientes </p>
        <nav className='mt-5 list-none'>
          <li className={router.pathname === '/' ? 'bg-blue-800 p-2' : 'p-2'}>
            <Link href='/' className='block'>
              Clients
            </Link>
          </li>
          <li
            className={
              router.pathname === '/orders' ? 'bg-blue-800 p-2' : 'p-2'
            }
          >
            <Link href='/orders' className='block'>
              Orders
            </Link>
          </li>
          <li
            className={
              router.pathname === '/products' ? 'bg-blue-800 p-2' : 'p-2'
            }
          >
            <Link href='/products' className='block'>
              Products
            </Link>
          </li>
        </nav>

        <div className='sm:mt-10'>
          <p className='text-2xl font-bold'>Other Options</p>
          <nav className='mt-5 list-none'>
            <li
              className={
                router.pathname === '/BestSellers' ? 'bg-blue-800 p-2' : 'p-2'
              }
            >
              <Link href='/BestSellers' className='block'>
                Best Sellers
              </Link>
            </li>
            <li
              className={
                router.pathname === '/BestClients' ? 'bg-blue-800 p-2' : 'p-2'
              }
            >
              <Link href='/BestClients' className='block'>
                Best Clients
              </Link>
            </li>
          </nav>
        </div>

        {data?.getUser?.rol === 'ADMIN' ? (
          <div className='sm:mt-10'>
            <p className='text-2xl font-bold'>Manage Users</p>
            <nav className='mt-5 list-none'>
              <li
                className={
                  router.pathname === '/users' ? 'bg-blue-800 p-2' : 'p-2'
                }
              >
                <Link href='/users' className='block'>
                  Users
                </Link>
              </li>
              <li
                className={
                  router.pathname === '/createaccount'
                    ? 'bg-blue-800 p-2'
                    : 'p-2'
                }
              >
                <Link href='/createaccount' className='block'>
                  Create User
                </Link>
              </li>
            </nav>
          </div>
        ) : null}
      </div>

      <div>
        <p className='mb-6'>{data?.getUser?.email}</p>
        <button
          className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 shadow-md'
          type='button'
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
