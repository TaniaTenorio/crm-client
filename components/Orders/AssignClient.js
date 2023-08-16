import * as React from 'react'
import Select from 'react-select'
import { GET_CLIENTS_USER } from '@/helpers/queries'
import { useQuery } from '@apollo/client'
import OrderContext from '@/context/orders/OrderContext'
import client from '@/config/apollo'

const AssignClient = () => {
  const [client, setClient] = React.useState([])

  // Order Context
  const orderContext = React.useContext(OrderContext)
  const { addClient } = orderContext

  const { data, loading, error } = useQuery(GET_CLIENTS_USER)

  React.useEffect(() => {
    addClient(client)
  }, [client])

  const selectClient = (client) => {
    setClient(client)
  }

  if (loading) return null

  const { getClientsSeller } = data

  return (
    <>
      <p className='mt-10 border-l-4 border-gray-800 text-gray-200 p-2 text-sm font-bold'>
        1. Assign a client to the order
      </p>
      <Select
        className='my-2'
        options={getClientsSeller}
        onChange={(val) => selectClient(val)}
        getOptionLabel={(clients) => clients.name}
        getOptionValue={(clients) => clients.id}
        placeholder='Options ...'
        styles={{
          menu: () => ({
            color: 'grey',
            backgroundColor: 'white',
          }),
        }}
      />
    </>
  )
}

export default AssignClient
