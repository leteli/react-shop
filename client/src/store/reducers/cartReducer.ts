import { AnyAction } from 'redux';
import { CART_FETCHED, ADDED_TO_CART, REMOVED_FROM_CART, CART_CLEARED } from '../constants';
import { ICartProductData } from '../../interfaces/interfaces';

type CartState = [] | ICartProductData[];
const initialState: CartState = [];

const cartReducer = (state = initialState, action: AnyAction): CartState => {
  switch (action.type) {
    case CART_FETCHED: {
      return action.payload;
    }
    case ADDED_TO_CART: {
      const newProduct = action.payload;
      const restProducts = state.filter((item) => item.id !== newProduct.id);
      return [...restProducts, newProduct];
    }
    case REMOVED_FROM_CART: {
      const id = action.payload;
      const restData = state.filter((item) => item.id !== id);
      return restData;
    }
    case CART_CLEARED: {
      return [];
    }
    default:
      return state;
  }
};

export default cartReducer;
