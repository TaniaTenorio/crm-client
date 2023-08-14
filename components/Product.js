import * as React from 'react'
import { DELETE_PRODUCT, GET_PRODUCTS } from '@/helpers/queries'
import { useMutation, useQuery } from '@apollo/client'
import Swal from 'sweetalert2'
import Router from 'next/router'

const Product = ({product}) => {
  const { name, stock, price, id } = product

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    update(cache) {
      // Get copy of actual cache
      const { getProducts } = cache.readQuery({ query: GET_PRODUCTS })

      // Rewrite cache
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getProducts: getProducts.filter( prevProduct => prevProduct.id !== id )
        }
      })
    }
  })

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure you want to delete this product?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await deleteProduct({
            variables: {
              id
            }
          })
          Swal.fire("Deleted!", data.deleteProduct, "success");
        } catch (error) {
          console.error(error)
        }
      }
    });
  }

  const handleEdit = () => {
    Router.push({
      pathname: '/editProduct/[id]',
      query: {id }
    })
  }

  return (
    <tr>
      <td className="border px-4 py-2 text-gray-700">{name}</td>
      <td className="border px-4 py-2 text-gray-700">{stock}</td>
      <td className="border px-4 py-2 text-gray-700">$ {price}</td>
      <td className="border px-4 py-2 text-gray-700">
        <button type="button" className="mr-6" onClick={() => handleDelete()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="red"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
        <button type="button" className="mr-6" onClick={() => handleEdit()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="green"
            className="w-6 h-6"
          >
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
          </svg>
        </button>
      </td>
    </tr>
  );
}

export default Product