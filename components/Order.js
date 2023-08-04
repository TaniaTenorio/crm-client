import * as React from 'react'
import { useMutation } from '@apollo/client'
import { DELETE_ORDER, UPDATE_ORDER, GET_ORDERS_SELLER } from '@/helpers/queries'
import Swal from 'sweetalert2'

const Order = ({ order }) => {
  const { id: orderId, total, client, status } = order
  const { name, last_name: lastName, email, phone, id: clientId } = client

  const [ UpdateOrder ] = useMutation(UPDATE_ORDER)
  const [ DeleteOrder ] = useMutation(DELETE_ORDER, {
    update(cache) {
      // Get copy of cache
      const { getOrderSeller } = cache.readQuery({ query: GET_ORDERS_SELLER })

      // Rewrite cache
      cache.writeQuery({
        query: GET_ORDERS_SELLER,
        data: {
          getOrderSeller: getOrderSeller.filter( prevOrder => prevOrder.id !== orderId)
        }
      })
    }
  })

  const [orderStatus, setOrderStatus ] = React.useState(status)
  const [ classString, setClassString ] = React.useState('')

  // Func to modify order color according to it's state
  const createClass = () => {
    if(orderStatus === 'PENDING') {
      setClassString('border-yellow-500')
    } else if (orderStatus === 'COMPLETED'){
      setClassString("border-green-500")
    } else {
      setClassString("border-red-500")
    }
  }

  React.useEffect(() => {
    if (orderStatus) {
      setOrderStatus(orderStatus);
    }
    createClass()
  }, [orderStatus]);

  const changeOrderState = async (newStatus) => {
    try {
      const { data } = await UpdateOrder({
        variables:{
          id: orderId,
          input: {
            client: clientId,
            status: newStatus, 
          }
        } 
      })
      setOrderStatus(data.updateOrder.status)
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = () => {
    console.log('deleting');
    Swal.fire({
      title: "Are you sure you want to delete this order?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await DeleteOrder({
            variables: {
              id: orderId
            },
          });
          Swal.fire("Deleted!", data.deleteOrder, "success")
        } catch (error) {
          console.error(error);
        }
      }
    });
  };


  return (
    <div className={`${classString} border-t-4 mt-4 bg-gray-300 rounded p-6 md:grid md:grid-cols-2 md:gap-4`}>
      <div>
        <p className="font-bold text-gray-700">
          Client: {name} {lastName}
        </p>
        {email && (
          <p className="text-gray-700 flex items-center my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            {email}
          </p>
        )}
        {phone && (
          <p className="text-gray-700 flex items-center my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>

            {phone}
          </p>
        )}

        <h2 className="text-gray-800 text-bold mt-10">Order Status</h2>
        <select
          className="mt-2 appearance-none bg-blue-700 border border-blue-700 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-800 focus:border-blue-800 uppercase text-xs font-bold"
          value={orderStatus}
          onChange={(e) => changeOrderState(e.target.value)}
        >
          <option value="COMPLETED">COMPLETED</option>
          <option value="PENDING">PENDING</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>

      <div>
        <h2 className="text-gray-800 font-bold mt-10">Order Summary</h2>
        {order.order.map((el) => (
          <div key={el.id}>
            <p className="text-sm text-gray-600">Product: {el.name}</p>
            <p className="text-sm text-gray-600">Amount: {el.amount}</p>
          </div>
        ))}

        <p className="text-gray-800 mt-3 font-bold">
          Total:
          <span className="font-light"> ${total}</span>
        </p>

        <button className="flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white leading-tight uppercase text-xs font-bold" onClick={() => handleDelete()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            class="w-6 h-6 mr-2"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clip-rule="evenodd"
            />
          </svg>
          Delete Order
        </button>
      </div>
    </div>
  );
}

export default Order