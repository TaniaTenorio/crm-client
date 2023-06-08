import * as React from "react"
import Layout from "@/components/Layout"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { AUTH_USER } from "@/helpers/queries"

const Login = () => {

const [message, setMessage] = React.useState(null)

const emailErrMssg = "Invalid Email"
const fieldErrMssg = "This field is mandatory"

const [authUser] = useMutation(AUTH_USER)
const router = useRouter()

const formik = useFormik({
  initialValues : {
    email: "",
    password: ""
  },
  validationSchema: Yup.object({
    email: Yup.string().email(emailErrMssg).required(fieldErrMssg),
    password: Yup.string().required(fieldErrMssg)
  }),
  onSubmit: async (values) => {
    const { email, password } = values
    try {
      const { data } = await authUser({
        variables: {
          input: {
            email,
            password
          }
        }
      })
      setMessage('Loading ...')

      // Save toke in local storage
      const { token } = data.authUser
      localStorage.setItem('token', token)

      //Redirect to clients screen
      setTimeout(() => {
        setMessage(null)
        router.push('/')
      }, 2000)
    } catch (error) {
      const errMssg = error.message.replace('GraphQL error:', '')
      setMessage(errMssg)
      console.error(error);

      setTimeout(() => {
        setMessage(null)
      }, 3000)
      
    }
  }
})

const renderMessage = () => {
  return (
    <div className="bg-white py-2 px-3 my-3 max-w-sm text-center mx-auto w-full flex justify-center">
      <p className="text-gray-700">{message}</p>
    </div>
  );
};

const renderError = (value) => {
  return formik.touched[value] && formik.errors[value] ? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <p className="font-bold">Error</p>
      <p>{formik.errors[value]}</p>
    </div>
  ) : null;
}

  return (
    <>
      <Layout>
        <h1 className="text-center text-2xl font-light">Login</h1>

        {message && renderMessage()}

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
              {renderError("password")}

              <input
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                type="submit"
                value="Log in"
              />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Login