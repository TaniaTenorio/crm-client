import * as React from 'react'
import Swal from "sweetalert2"
import { DELETE_CLIENT, GET_CLIENTS_USER } from '@/helpers/queries'
import { useMutation } from '@apollo/client'
import Router from 'next/router'

const Client = ({client}) => {
  const { name, last_name, company, email, id } = client

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
  
  const handleEdit = () => {
    Router.push({
      pathname: "/editClient/[id]",
      query: { id }
    })
  }

  return (
    <tr>
      <td className="border px-4 py-2 text-gray-700">
        {name} {last_name}
      </td>
      <td className="border px-4 py-2 text-gray-700">{company}</td>
      <td className="border px-4 py-2 text-gray-700">{email}</td>
      <td className="border px-4 py-2 text-gray-700">
        <button type="button" className="mr-6" onClick={() => handleDelete(id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="red"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clip-rule="evenodd"
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

export default Client