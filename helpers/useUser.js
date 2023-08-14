import * as React from 'react'
import { useRouter } from "next/router";
import { GET_USER } from './queries'
import { useQuery } from '@apollo/client'

export default function useUser({
  redirectTo = '',
}) {
  const { data, loading, client } = useQuery(GET_USER)
  const router = useRouter()
  const pathname = router.pathname
  
  React.useEffect(() => {
    if(!redirectTo || loading) return

    if(data?.getUser?.rol !== 'ADMIN' && pathname === '/createaccount' ){
       router.push(redirectTo);
    }

    if(redirectTo && !data?.getUser && !loading) {
      router.push(redirectTo)
    }

  }, [redirectTo, data, loading, pathname, router])

  const user = data?.getUser

  return { user, loading, client } 
}
