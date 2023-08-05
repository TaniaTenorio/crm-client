import * as React from 'react'
import Layout from '@/components/Layout'
import AssignClient from '@/components/Orders/AssignClient'
import AssingProducts from '@/components/Orders/AssingProducts'
import OrderContext from '@/context/orders/OrderContext'
import OrderSummary from '@/components/Orders/OrderSummary'
import Total from '@/components/Orders/Total'
import { NEW_ORDER, GET_ORDERS_SELLER } from '@/helpers/queries'
import { useMutation  } from '@apollo/client'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const NewOrder = () => {
  const router = useRouter()
  const [message, setMessage] = React.useState(null)

  // Use context y get values and funcs
  const orderContext = React.useContext(OrderContext)
  const { client, products, total } = orderContext

  const [ NewOrder ] = useMutation(NEW_ORDER, {
    update(cache, { data: { NewOrder }}){
      // Get cache
      const { getOrderSeller } = cache.readQuery({ query: GET_ORDERS_SELLER })

      // Rewrite cache
      cache.writeQuery({
        query: GET_ORDERS_SELLER,
        data: {
          getOrderSeller: {...getOrderSeller, NewOrder}
        }
      })
    }
  })

  const validateOrder = () => {
     return !products.every((el) => el.amount > 0) || total === 0 || client.length === 0 ? ' opacity-50 cursor-not-allowed ': ''
  }

  const createNewOrder = async () => {
    const { id } = client;
    // Remove extra data from products
    const order = products.map(({ __typename, stock, created_at, ...product }) => product)

    console.log('order', order);
    try {
      const { data } =  await NewOrder({
        variables: {
          input: {
            client: id,
            total,
            order
          }
        }
      })
      
      router.push('/orders')

      Swal.fire(
        'Sucess!',
        'The order was successfully created',
        'success'
      )
         
    } catch (error) {
      setMessage(error.message.replace('GraphQL error: ', ''))

      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const showErrMssg = () => {
    return (
      <div className='bg-gray-600 py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
        <p>{message}</p>
      </div>
    )
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-200 font-light">New Order</h1>

      {message && showErrMssg()}

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <AssignClient />
          <AssingProducts />
          <OrderSummary />
          <Total />

          <button
            type='button'
            className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-400 ${validateOrder()}`}
            onClick={() => createNewOrder()}
          >Create Order</button>
        </div>
      </div>
    </Layout>

  );
}

export default NewOrder