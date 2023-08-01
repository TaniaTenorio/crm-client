import * as React from 'react'
import Layout from '@/components/Layout'
import AssignClient from '@/components/Orders/AssignClient'
import AssingProducts from '@/components/Orders/AssingProducts'
import OrderContext from '@/context/orders/OrderContext'


const NewOrder = () => {
  // Use context y get values and funcs
  const orderContext = React.useContext(OrderContext)

  return (
    <Layout>
      <h1 className="text-2xl text-gray-200 font-light">New Order</h1>
      <AssignClient />
      <AssingProducts />
    </Layout>

  );
}

export default NewOrder