import * as React from 'react'
import OrderContext from '@/context/orders/OrderContext'

const ProductSummary = ({product}) => {
const { name, price } = product

const [ amount, setAmount ] = React.useState(0)

const orderContext = React.useContext(OrderContext)
const { productAmount, updateTotal } = orderContext

const updateAmount = () => {
  const newProduct = {
    ...product,
    amount: Number(amount)
  }
  productAmount(newProduct)
}

React.useEffect(() => {
  updateAmount()
  updateTotal()
}, [amount])

  return (
   <div className='md:flex md:justify-between md: items-center mt-5'>
    <div className='md:w-2/4 mb-2 md:mb-0'>
      <p className='text-sm'>{name}</p>
      <p>$ {price}</p>
    </div>
    <input 
      type='number'
      placeholder='Units'
      className='shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4'
      onChange={(e) => setAmount(e.target.value)}
    />
   </div>
  )
}

export default ProductSummary