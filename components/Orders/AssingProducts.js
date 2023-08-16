import * as React from 'react'
import Select from 'react-select'
import { GET_PRODUCTS } from '@/helpers/queries'
import { useQuery } from '@apollo/client'
import OrderContext from '@/context/orders/OrderContext'

const AssingProducts = () => {
  const [products, setProducts] = React.useState([])
  const { data, loading, error } = useQuery(GET_PRODUCTS)

  const orderContext = React.useContext(OrderContext)
  const { addProduct } = orderContext

  React.useEffect(() => {
    addProduct(products)
  }, [products])

  const selectProduct = (product) => {
    setProducts(product)
  }

  if (loading) return null

  const { getProducts } = data

  return (
    <>
      <p className='mt-10 border-l-4 border-gray-800 text-gray-200 p-2 text-sm font-bold'>
        2. Search and select the products
      </p>
      <Select
        className='my-2'
        isMulti
        options={getProducts}
        onChange={(val) => selectProduct(val)}
        getOptionLabel={(products) =>
          `${products.name} - ${products.stock} units`
        }
        getOptionValue={(products) => products.id}
        placeholder='Options ...'
        styles={{
          menu: () => ({
            color: 'grey',
            backgroundColor: 'white',
          }),
        }}
      />
    </>
  )
}

export default AssingProducts
