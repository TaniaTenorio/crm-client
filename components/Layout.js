import React from 'react'
import Head from 'next/head'
import Sidebar from './Sidebar'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>CRM - Clients Manager</title>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'
          integrity='sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=='
          crossorigin='anonymous'
          referrerpolicy='no-referrer'
        />
      </Head>

      <div className='min-h-screen'>
        {router.pathname === '/login' ? (
          <div className='min-h-screen flex flex-col justify-center'>
            {children}
          </div>
        ) : (
          <div className='sm:flex min-h-screen'>
            <Sidebar />
            <main className='sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5'>
              {children}
            </main>
          </div>
        )}
      </div>
    </>
  )
}

export default Layout
