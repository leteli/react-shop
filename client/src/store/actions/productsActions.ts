import { PRODUCTS_FETCHED, PRODUCT_UPDATED } from '../constants';
import { IProductData } from '../../interfaces/interfaces';

const productsFetched = (payload: IProductData[]) => {
  return {
    type: PRODUCTS_FETCHED,
    payload,
  };
};

export const productUpdated = (payload: IProductData) => {
  return {
    type: PRODUCT_UPDATED,
    payload,
  };
};


export default productsFetched;
