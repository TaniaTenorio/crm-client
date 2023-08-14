import * as React from 'react'
import Layout from '@/components/Layout'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ONE_USER } from '@/helpers/queries'
import { UPDATE_USER } from '@/helpers/queries'

const EditUser = () => {
  const router = useRouter()
  const { query: { id } } = router
  
  const { data, loading, error } = useQuery(GET_ONE_USER, {
    variables: {
      id
    }
  })

  const [ updateUser ] = useMutation(UPDATE_USER)

  const fieldErrorMsg = "This field is mandatory"
  const emailErrMsd = "Invalid Email"

  const validationSchema = Yup.object({
    name: Yup.string().required(fieldErrorMsg),
    last_name: Yup.string().required(fieldErrorMsg),
    email: Yup.string().email(emailErrMsd).required(fieldErrorMsg),
    rol: Yup.string().required(fieldErrorMsg),
  });

  if(loading) {
    return (
      <p>Loading ...</p>
    )
  }

  if(!data) {
    return (
      <p>User not found</p>
    )
  }

  const { getOneUser: usersData } = data

  const handleUpdateUser = async (values) => {
    const { name, last_name, email, rol } = values;
    try {
      const { data } = await updateUser({
        variables: {
          id,
          input: {
            name,
            last_name,
            email,
            rol,
          },
        },
      });

      console.log('DATA', data);

      Swal.fire(
        "Done!",
        `User: ${data.updateUser.name} was successfully updated`,
        "success"
      );

      router.push("/users");
    } catch (error) {
      console.error(error);
    }
  }

  const renderError = (error) => {
    return (
      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  };
  
  console.log("USER_ID", usersData);
  return (
    <Layout>
      <h1 className="text-2xl text-gray-200 font-light">Edit User</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <Formik
            enableReinitialize
            initialValues={usersData}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleUpdateUser(values);
            }}
          >
            {(props) => {
              return (
                <form
                  className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
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
                      placeholder="User Name"
                      value={props.values.name}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  {props.touched.name && props.errors.name ? renderError("name") : null}

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
                      value={props.values.last_name}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  {props.touched.lasy_name && props.errors.last_name ? renderError("lastName") : null}

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
                      value={props.values.email}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  {props.touched.email && props.errors.email ? renderError("email") : null}

                  {/* <div className="mb-4">
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
                      value={props.values.password}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div> */}
                  {/* {renderError("password")} */}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="rol"
                    >
                      Rol
                    </label>
                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="rol"
                      type="select"
                      value={props.values.rol}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    >
                      <option>Select a rol</option>
                      <option value="ADMIN">Admin</option>
                      <option value="SELLER">Seller</option>
                    </select>
                  </div>
                  {props.touched.rol && props.errors.rol ? renderError("rol") : null}

                  <input
                    className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900"
                    type="submit"
                    value="Update User"
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
 
export default EditUser;