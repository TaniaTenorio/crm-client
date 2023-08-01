import * as React from 'react'
import OrderContext from './OrderContext'
import OrderReducer from './OrderReducer'
import { SELECT_CLIENT, SELECT_ODRER, SELECT_PRODUCT } from '../../types'

const OrderState = ({ children }) => {
  // Orders state
  const initialState = {
    client: {},
    products: [],
    total: 0
  }

  const [ state, dispatch ] = React.useReducer(OrderReducer, initialState )

  // Update client
  const addClient = (client) => {
    dispatch({
      type: SELECT_CLIENT,
      payload: client
    })
  }

  const addProduct = (products) => {
    dispatch({
      type: SELECT_PRODUCT,
      payload: products
    })
  };

  return (
    <OrderContext.Provider value={{addClient, addProduct}}>
       {children}
    </OrderContext.Provider>
  )
}

export default OrderState


