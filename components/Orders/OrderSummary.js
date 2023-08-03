import * as React from 'react'
import OrderContext from '@/context/orders/OrderContext'
import ProductSummary from './ProductSummary'

const OrderSummary = () => {
  const orderContext = React.useContext(OrderContext)
  const { products, updateTotal } = orderContext;

  React.useEffect(() => {
    updateTotal()
  }, [products])

  return (
    <>
      <p className="mt-10 border-l-4 border-gray-800 text-gray-200 p-2 text-sm font-bold">
        2. Select the units of each product selected
      </p>
      {products.length > 0 ? (
        <>
          {products.map((el) => (
            <ProductSummary key={el.id} product={el}/>
          ))
          }
        </>
        ) : (
        <p className='mt-5 text-sm'>Aún no hay productos</p>
      )}
    </>
  );
}

export default OrderSummary