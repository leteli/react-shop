import { CART_FETCHED, ADDED_TO_CART, REMOVED_FROM_CART, CART_CLEARED } from '../constants';
import { ICartProductData } from '../../interfaces/interfaces';

const cartFetched = (payload: ICartProductData[]) => {
  return {
    type: CART_FETCHED,
    payload,
  };
};

export const addedToCart = (payload: ICartProductData) => {
  return {
    type: ADDED_TO_CART,
    payload,
  };
};

export const removedFromCart = (id: number) => {
  return {
    type: REMOVED_FROM_CART,
    payload: id,
  };
};

export const cartCleared = () => {
  return {
    type: CART_CLEARED,
  };
};
  
export default cartFetched;
