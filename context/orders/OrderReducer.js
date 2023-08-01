import { SELECT_CLIENT, SELECT_ODRER, SELECT_PRODUCT } from '../../types'

const OrderReducer = (state, action) => {
  switch (action.type) {
    case SELECT_CLIENT:
      return {
        ...state,
        client: action.payload
      }
    default:
      return state;
  }
}

export default OrderReducer