import { AnyAction } from 'redux';
import { PRODUCTS_FETCHED, PRODUCT_UPDATED } from '../constants';
import { IProductData } from '../../interfaces/interfaces';

type ProductsState = [] | IProductData[];
const initialState: ProductsState = [];

const productsReducer = (state = initialState, action: AnyAction): ProductsState => {
  switch (action.type) {
    case PRODUCTS_FETCHED: {
      return action.payload;
    }
    case PRODUCT_UPDATED: {
      const newData = action.payload;
      const restData = state.filter((p) => p.id !== newData.id);
      const newState = [...restData, newData].sort((p1, p2) => p1.id - p2.id);
      return newState;
    }
    default:
      return state;
  }
};

export default productsReducer;
