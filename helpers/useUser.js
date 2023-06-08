import * as React from 'react'
import Router from "next/router";
import { GET_USER } from './queries'
import { useQuery } from '@apollo/client'

export default function useUser({
  redirectTo = '',
}) {
  const { data, loading, client } = useQuery(GET_USER)
  
  React.useEffect(() => {
    if(!redirectTo || loading) return

    if(redirectTo && !data?.getUser && !loading) {
      Router.push(redirectTo)
    }
  }, [redirectTo, data, loading])

  const user = data?.getUser

  return { user, loading, client } 
}
