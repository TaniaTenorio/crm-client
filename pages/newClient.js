import * as React from 'react'
import Layout from '@/components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { NEW_CLIENT, GET_CLIENTS_USER } from '@/helpers/queries'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

const NewClient = () => {
  const fieldErrMssg = 'This field is mandatory'
  const emailErrMssg = 'Inavalid emil'
  const router = useRouter()

  const [newClient] = useMutation(NEW_CLIENT, {
    update(cache, { data: { newClient }}) {
      // Get cache object we want to update
      const { getClientsSeller } = cache.readQuery({ query: GET_CLIENTS_USER })

      // Rewrite cache
      cache.writeQuery({
        query: GET_CLIENTS_USER,
        data: {
          getClientsSeller: [...getClientsSeller, newClient]
        }
      })
    }
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      company: '',
      email: '',
      phone: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(fieldErrMssg),
      lastName: Yup.string().required(fieldErrMssg),
      company: Yup.string().required(fieldErrMssg),
      email: Yup.string().email(emailErrMssg).required(fieldErrMssg)
    }),

    onSubmit: async (values) => {
      const { name, lastName, company, email, phone } = values
      try {
        const { data } = await newClient({
          variables: {
            input: {
              name,
              last_name: lastName,
              company,
              email,
              phone
            }
          }
        })
        console.log(data.newClient);
        router.push('/')
      } catch (error) {
         console.log(error);
      }
    }
  })

  const renderError = (value) => {
    return formik.touched[value] && formik.errors[value] ? (
      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
        <p className="font-bold">Error</p>
        <p>{formik.errors[value]}</p>
      </div>
    ) : null
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-200 font-light">New Client</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
            {renderError("name")}

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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
            </div>
            {renderError("lastName")}

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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.company}
              />
            </div>
            {renderError("company")}

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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            {renderError("email")}

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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
            </div>

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 uppercase font-bold hover:bg-gray-900"
              value="Register Client"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default NewClient