import { Dispatch, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { updateProduct } from '../api/routes';
import { productUpdated } from '../store/actions/productsActions';

import type { RootState } from '../index';
import { IProductData } from '../interfaces/interfaces';

const middlewareChangedAmount =
  (id: number, inputCount: number): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    const state: RootState = getState();
    const cartProduct = state.cart.find((product) => product.id === id);
    const prevCount = cartProduct ? cartProduct.quantity : 0;
    const newQuantity = prevCount + inputCount;
    const quantityDiff = newQuantity - prevCount;
    const product = state.products.find((product) => product.id === id) as IProductData;
    const diff = product.inStock - quantityDiff;
    const inStock = diff < 0 ? 0 : diff;
    const newProduct: IProductData = { ...product, inStock };
    updateProduct(newProduct)
      .then((data) => {
        if (data !== undefined) {
          dispatch(productUpdated(data));
        }
      })
      .catch((err) => console.log(err));
};

export const middlewareUpdatedProduct =
  (data: IProductData): ThunkAction<void, RootState, unknown, AnyAction> => 
  (dispatch: Dispatch<AnyAction>) => {
    updateProduct(data)
      .then((data) => {
        if (data !== undefined) {
          dispatch(productUpdated(data));
        }
      })
      .catch((err) => console.log(err));
};

export default middlewareChangedAmount;
