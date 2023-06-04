import Layout from "@/components/Layout"
import { useQuery } from "@apollo/client"
import { GET_CLIENTS_USER } from "@/helpers/queries"

export default function Home() {
  const { data, loading, error } = useQuery(GET_CLIENTS_USER)

  if(loading) {
    'Loading ...'
  }

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-200 font-light">Clients</h1>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-700">
            <tr className="text-white">
              <th className="w-1/5 py-2">Name</th>
              <th className="w-1/5 py-2">Company</th>
              <th className="w-1/5 py-2">Email</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {data.getClientsSeller.map((client) => (
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
