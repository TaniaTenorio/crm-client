import * as React from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { GET_ONE_PRODUCT, UPDATE_PRODUCT } from '@/helpers/queries'
import { useMutation, useQuery } from '@apollo/client'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'

const EditProduct = () => {
  const router = useRouter()
  const { query: { id } } = router
  
  const { data: productData, loading, error } = useQuery(GET_ONE_PRODUCT, {
    variables: {
      id
    }
  })

  const [ updateProduct ] = useMutation(UPDATE_PRODUCT)

  const fieldErrMssg = "This field is mandatory";
  const posNumberMssg = "Please enter positive numbers only";
  const intNumberMssg = "Please enter an integer";
  
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    stock: Yup.number()
      .required(fieldErrMssg)
      .positive(posNumberMssg)
      .integer(intNumberMssg),
    price: Yup.number().required(fieldErrMssg).positive(posNumberMssg),
  });

  if(loading) return 'Loading ...'

  if(!productData) return 'Product not found'

  const { getOneProduct } = productData

  const handleUpdateProduct = async (values) => {
    const { name, stock, price } = values
    try {
      const { data } = await updateProduct({
        variables: {
          id,
          input: {
            name,
            stock,
            price
          }
        }
      })

      Swal.fire(
        'Done!',
        `Product: ${data.updateProduct.name} was successfully updated`,
        'success'
      )

      router.push('/products')
    } catch (error) {
      console.error(error)
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

  return (
    <Layout>
      <h1 className="text-2xl text-gray-200 font-light">Edit Product</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            enableReinitialize
            initialValues={getOneProduct}
            validationSchema={validationSchema}
            onSubmit={ values => {
              handleUpdateProduct(values);
            }}
          >
          {props => {
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
                    placeholder="Product Name"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.name}
                  />
                </div>
                {/* {renderError("name")} */}

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="stock"
                  >
                    Stock
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="stock"
                    type="number"
                    placeholder="Product Stock"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.stock}
                  />
                </div>
                {/* {renderError("stock")} */}

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price"
                  >
                    Price
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    type="number"
                    placeholder="Product Price"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.price}
                  />
                </div>
                {/* {renderError("price")} */}

                <input
                  type="submit"
                  className="bg-gray-800 w-full mt-5 p-2 uppercase font-bold hover:bg-gray-900"
                  value="Edit Product"
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

export default EditProduct