import * as React from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { GET_CLIENT, UPDATE_CLIENT } from '@/helpers/queries'
import { useQuery, useMutation } from '@apollo/client'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'

const EditClient = () => {
  const router = useRouter()
  const { query: { id } } = router

  const { data: clientData, loading, error} = useQuery(GET_CLIENT, {
    variables: {
      id
    }
  })

  const [updateClient] = useMutation(UPDATE_CLIENT)

  if(loading) {
    return (
      <p>Loading ...</p>
    )
  }

  const { getClient } = clientData;
  const fieldErrMssg = "This field is mandatory"
  const emailErrMssg = "Inavalid emil"

  const validationSchema = Yup.object({
    name: Yup.string().required(fieldErrMssg),
    lastName: Yup.string().required(fieldErrMssg),
    company: Yup.string().required(fieldErrMssg),
    email: Yup.string().email(emailErrMssg).required(fieldErrMssg),
  });

  const getInitialValues = () => {
    const { name, last_name: lastName, company, email, phone } = getClient;
    return {name, lastName, company, email, phone}
  }

  const renderError = (error) => {
    return (
      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    )
  };

  const handleUpdate = async (values) => {
    const { name, lastName: last_name,  company, email, phone } = values
    try {
      const { data } = await updateClient({
        variables: {
          id,
          input: {
            name,
            last_name,
            company,
            email,
            phone
          }
        }
      })
      Swal.fire(
        'Updated!',
        'Client updated successfully',
        'success'
      )
      router.push("/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-200 font-light">New Client</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={validationSchema}
            initialValues={getInitialValues()}
            onSubmit={(values) => {
              handleUpdate(values)
            }}
          >
            {(props) => {
              return (
                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
                >
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Client Name"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.name}
                    />
                  </div>
                  {props.touched.name && props.errors.name
                    ? renderError(props.errors.name)
                    : null}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="lastName"
                      type="text"
                      placeholder="Client Last Name"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.lastName}
                    />
                  </div>
                  {props.touched.lastName && props.errors.lastName
                    ? renderError(props.errors.lastName)
                    : null}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="company"
                    >
                      Company
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="company"
                      type="text"
                      placeholder="Client Company"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.company}
                    />
                  </div>
                  {props.touched.company && props.errors.company
                    ? renderError(props.errors.company)
                    : null}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="text"
                      placeholder="Client Email"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.email}
                    />
                  </div>
                  {props.touched.email && props.errors.email
                    ? renderError(props.errors.email)
                    : null}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="phone"
                      type="tel"
                      placeholder="Client Phone Number"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.phone}
                    />
                  </div>

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 uppercase font-bold hover:bg-gray-900"
                    value="Edit Client"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
}

export default EditClient
