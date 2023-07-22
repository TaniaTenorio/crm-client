import * as React from "react"
import Layout from "@/components/Layout"
import Link from "next/link"
import { GET_PRODUCTS } from "@/helpers/queries"
import { useQuery } from "@apollo/client"
import Product from "@/components/Product"

const Products = () => {
  const { data: productData, loading, error } = useQuery(GET_PRODUCTS)

  if(loading) {
    return (
      <p>Loading ...</p>
    )
  }

  // console.log(productData);

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-200 font-light">Products</h1>
        <Link
          className="bg-blue-800 py-2 px-5 mt-3 inline-block rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold"
          href="/newProduct"
        >
          New Product
        </Link>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-700">
            <tr className="text-white">
              <th className="w-1/4 py-2">Name</th>
              <th className="w-1/4 py-2">Stock</th>
              <th className="w-1/4 py-2">Price</th>
              <th className="w-1/4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {productData?.getProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
};

export default Products
