import * as React from 'react'
import Select from 'react-select'
import { GET_CLIENTS_USER } from '@/helpers/queries'
import { useQuery } from '@apollo/client'
import OrderContext from '@/context/orders/OrderContext'


const AssignClient = () => {
  const [clients, setClients] = React.useState([]);

  // Order Context
  const orderContext = React.useContext(OrderContext)
  const { addClient } = orderContext

  const { data, loading, error } = useQuery(GET_CLIENTS_USER)

  React.useEffect(() => {
    if(data && !error) {
      const { getClientsSeller } = data;
      setClients(getClientsSeller);
    }
  }, [data, error]);

  const selectClient = (client) => {
    addClient(client);
  };

  if(loading) return null

  

  return (
    <>
      <p className="mt-10 border-l-4 border-gray-800 text-gray-200 p-2 text-sm font-bold">
        1. Assign a client to the order
      </p>
      <Select
        className="my-2"
        options={clients}
        onChange={(val) => selectClient(val)}
        getOptionLabel={(clients) => clients.name}
        getOptionValue={(clients) => clients.id}
        placeholder="Options ..."
        styles={{
          menu: () => ({
            color: "grey",
            backgroundColor: "white",
          }),
        }}
      />
    </>
  );
}

export default AssignClient