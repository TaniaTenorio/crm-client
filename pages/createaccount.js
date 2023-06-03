import React, { useState } from "react"
import Layout from "@/components/Layout"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useMutation, gql } from "@apollo/client"
import { useRouter } from "next/router"

const CREATE_USER = gql`
  mutation newUser($input: UserInput!) {
    newUser(input: $input) {
      created_at
      email
      id
      last_name
      name
    }
  }
`;


const NewAccount = () => {
  const fieldErrorMsg = "This field is mandatory"
  const emailErrMsd = 'Invalid Email'
  const passwordErrMsg = 'Password must have at least 6 characters'

  const router = useRouter()

  const [ message, setMessage] = useState(null)

  // Create user

  const [newUser] = useMutation(CREATE_USER)

  // Form validation
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(fieldErrorMsg),
      lastName: Yup.string().required(fieldErrorMsg),
      email: Yup.string().email(emailErrMsd).required(fieldErrorMsg),
      password: Yup.string().required(fieldErrorMsg).min(6, passwordErrMsg)
    }),
    onSubmit: async (values) => {
      const {name, lastName, email, password} = values
      try {
        const { data } = await newUser({
          variables: {
            input: {
              name,
              last_name: lastName,
              email,
              password 
            }
          }
        })
        // Usuario generado correctamente
        setMessage(`User ${data.newUser.name} was created successfully`)

        setTimeout(() => {
          setMessage(null)
          router.push("/login")
        }, 3000);
      

        // Redirigir al home page

      } catch (error) {
        console.error(error)
        const errorMssg = error.message.replace('GraphQL error', '')
        setMessage(errorMssg);

        setTimeout(() => {
          setMessage(null)
        }, 3000)

      }
    },
  });

  const renderMessage = () => {
    return (
      <div className="bg-white py-2 px-3 my-3 mx-w-sm text-center mx-auto">
        <p className="text-gray-700">{message}</p>
      </div>
    )
  }

  const renderError = (value) => {
    return(
      formik.touched[value] && formik.errors[value] ? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p className="font-bold">Error</p>
          <p>{formik.errors[value]}</p>
        </div>
      ) : null
    )
  }

  return (
    <>
      <Layout>
      {message && renderMessage()}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
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
                  placeholder="User Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                  placeholder="User Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {renderError("lastName")}

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
                  type="email"
                  placeholder="User Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {renderError("email")}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="User Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {renderError("password")}

              <input
                className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900"
                type="submit"
                value="Create Account"
              />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NewAccount;
