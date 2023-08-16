import * as React from 'react'
import OrderContext from './OrderContext'
import OrderReducer from './OrderReducer'
import {
  SELECT_CLIENT,
  PRODUCT_AMOUNT,
  SELECT_PRODUCT,
  UPDATE_TOTAL,
} from '../../types'

const OrderState = ({ children }) => {
  // Orders state
  const initialState = {
    client: {},
    products: [],
    total: 0,
  }

  const [state, dispatch] = React.useReducer(OrderReducer, initialState)

  // Update client
  const addClient = (client) => {
    dispatch({
      type: SELECT_CLIENT,
      payload: client,
    })
  }

  // Update product
  const addProduct = (selectedProducts) => {
    // Check if there is a previous product to avoid overriding the amount property
    // React select behaviour overwrites the state when isMulti is true
    let newState
    if (state.products.length > 0) {
      // Copy new array of products and asign it to the previous array
      newState = selectedProducts.map((product) => {
        const newObj = state.products.find((el) => el.id === product.id)
        return {
          ...product,
          ...newObj,
        }
      })
    } else {
      newState = selectedProducts
    }

    dispatch({
      type: SELECT_PRODUCT,
      payload: newState,
    })
  }

  // Update product amount
  const productAmount = (product) => {
    dispatch({
      type: PRODUCT_AMOUNT,
      payload: product,
    })
  }

  // Update Total
  const updateTotal = () => {
    dispatch({
      type: UPDATE_TOTAL,
    })
  }

  return (
    <OrderContext.Provider
      value={{
        products: state.products,
        total: state.total,
        client: state.client,
        addClient,
        addProduct,
        productAmount,
        updateTotal,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export default OrderState
