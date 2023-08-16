import * as React from 'react'
import Layout from '@/components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { NEW_PRODUCT, GET_PRODUCTS } from '@/helpers/queries'
import { useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const NewProduct = () => {
  const fieldErrMssg = 'This field is mandatory'
  const posNumberMssg = 'Please enter positive numbers only'
  const intNumberMssg = 'Please enter an integer'

  const router = useRouter()
  const [newProduct] = useMutation(NEW_PRODUCT, {
    update(cache, { data: { newProduct } }) {
      const { getProducts } = cache.readQuery({ query: GET_PRODUCTS })

      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getProducts: [...getProducts, newProduct],
        },
      })
    },
  })

  // Form for new peoduct
  const formik = useFormik({
    initialValues: {
      name: '',
      stock: '',
      price: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      stock: Yup.number()
        .required(fieldErrMssg)
        .positive(posNumberMssg)
        .integer(intNumberMssg),
      price: Yup.number().required(fieldErrMssg).positive(posNumberMssg),
    }),
    onSubmit: async (values) => {
      const { name, stock, price } = values
      try {
        const { data } = await newProduct({
          variables: {
            input: {
              name,
              stock,
              price,
            },
          },
        })

        Swal.fire(
          'Done!',
          `New Product: "${data.newProduct.name}" was successfully created`,
          'success'
        )
        router.push('/products')
      } catch (error) {
        console.error(error)
      }
    },
  })

  const renderError = (value) => {
    return formik.touched[value] && formik.errors[value] ? (
      <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
        <p className='font-bold'>Error</p>
        <p>{formik.errors[value]}</p>
      </div>
    ) : null
  }

  return (
    <Layout>
      <h1 className='text-2xl text-gary-200 font-light'>New Product</h1>

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <form
            className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
            onSubmit={formik.handleSubmit}
          >
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='name'
              >
                Name
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='name'
                type='text'
                placeholder='Product Name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
            {renderError('name')}

            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='stock'
              >
                Stock
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='stock'
                type='number'
                placeholder='Product Stock'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.stock}
              />
            </div>
            {renderError('stock')}

            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='price'
              >
                Price
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='price'
                type='number'
                placeholder='Product Price'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
            </div>
            {renderError('price')}

            <input
              type='submit'
              className='bg-gray-800 w-full mt-5 p-2 uppercase font-bold hover:bg-gray-900'
              value='Add Product'
            />
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default NewProduct
