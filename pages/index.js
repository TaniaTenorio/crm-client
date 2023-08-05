import Client from '@/components/Client'
import Layout from "@/components/Layout"
import { GET_CLIENTS_USER } from "@/helpers/queries"
import useUser from '@/helpers/useUser'
import { useQuery } from "@apollo/client"
import Link from 'next/link'

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
        <Link className="bg-blue-800 py-2 px-5 mt-3 inline-block rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center" href="/newClient">New Client</Link>

        <div className='overflow-x-scroll'>
          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-700">
              <tr className="text-white">
                <th className="w-1/4 py-2">Name</th>
                <th className="w-1/4 py-2">Company</th>
                <th className="w-1/4 py-2">Email</th>
                <th className="w-1/4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {data?.getClientsSeller?.map((client) => (
                <Client key={client.id} client={client}/>
              ))}
            </tbody>
          </table>

        </div>
      </Layout>
    </div>
  )
}
