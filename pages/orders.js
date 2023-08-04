import Layout from "@/components/Layout"
import * as React from "react"
import Link from "next/link"
import { useQuery } from "@apollo/client"
import { GET_ORDERS_SELLER } from "@/helpers/queries"
import Order from "@/components/Order"

const Orders = () => {

  const { data, loading, error } = useQuery(GET_ORDERS_SELLER)
  console.log('orders_data', data, loading, error);

  if(loading) return 'Loading ...'

  const { getOrderSeller } = data

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-200 font-light">Orders</h1>
        <Link
          className="bg-blue-800 py-2 px-5 mt-3 inline-block rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold"
          href="/newOrder"
        >
          New Order
        </Link>

        {getOrderSeller.length === 0 ? (
          <p className="mt-5 text-center text-2xl">There are no orders yet</p>
        ) : (
          getOrderSeller.map((el) => (
            <Order 
              key={el.id}
              order={el}
            />
          ))
        )}
      </Layout>
    </div>
  );
}

export default Orders