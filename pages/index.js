import * as React from 'react'
import Layout from "@/components/Layout"
import { useQuery } from "@apollo/client"
import { GET_CLIENTS_USER } from "@/helpers/queries"
import { useRouter } from "next/router"
import Link from 'next/link'
import useUser from '@/helpers/useUser'

export default function Home() {
  const { data, loading } = useQuery(GET_CLIENTS_USER)
  const { user, loading: userLoading } = useUser({redirectTo: '/login'})

  if (userLoading || !user) {
    return null;
  }

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-200 font-light">Clients</h1>
        <Link className="bg-blue-800 py-2 px-5 mt-3 inline-block rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold" href="/newClient">New Client</Link>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-700">
            <tr className="text-white">
              <th className="w-1/5 py-2">Name</th>
              <th className="w-1/5 py-2">Company</th>
              <th className="w-1/5 py-2">Email</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {data?.getClientsSeller?.map((client) => (
              <tr key={client.id}>
                <td className="border px-4 py-2 text-gray-700">{client.name} {client.last_name}</td>
                <td className="border px-4 py-2 text-gray-700">{client.company}</td>
                <td className="border px-4 py-2 text-gray-700">{client.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  )
}
