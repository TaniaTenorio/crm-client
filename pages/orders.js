import Layout from "@/components/Layout"
import * as React from "react"
import Link from "next/link";

const Orders = () => {
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
      </Layout>
    </div>
  );
}

export default Orders