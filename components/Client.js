import * as React from 'react'
import Swal from "sweetalert2"
import { DELETE_CLIENT, GET_CLIENTS_USER } from '@/helpers/queries'
import { useMutation } from '@apollo/client'

const Client = ({client}) => {
  const { name, lastName, company, email, id } = client

  const [ deleteClient ] = useMutation(DELETE_CLIENT, {
    update(cache) {
      // Get copy of cache
      const { getClientsSeller } = cache.readQuery({ query: GET_CLIENTS_USER });

      // Rewrite cache
      cache.writeQuery({
        query: GET_CLIENTS_USER,
        data: {
          getClientsSeller: getClientsSeller.filter( prevClient => prevClient.id !== id)
        }
      })
    }
  })

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this client?",
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
          const { data } = await deleteClient({
            variables: {
              id: id
            }
          })
          Swal.fire("Deleted!", data.deleteClient, "success");
        } catch (error) {
          console.error(error);
        }
      }
    });
  }

  return (
    <tr>
      <td className="border px-4 py-2 text-gray-700">
        {name} {lastName}
      </td>
      <td className="border px-4 py-2 text-gray-700">{company}</td>
      <td className="border px-4 py-2 text-gray-700">{email}</td>
      <td className="border px-4 py-2 text-gray-700">
        <button
          type="button"
          className="flex justify-center items-center bg-red-800 py-2 px-4 w-full rounded text-xs font-bold text-white uppercase"
          onClick={() => handleDelete(id)}
        >
          Eliminar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 ml-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
}

export default Client