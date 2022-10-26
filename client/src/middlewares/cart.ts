import { AnyAction } from 'redux';
import { addToCart, fetchCart, removeFromCart, clearCart } from '../api/routes';
import cartFetched, { addedToCart, removedFromCart, cartCleared } from '../store/actions/cartActions';
import { ThunkAction } from 'redux-thunk';
import { IProductData } from '../interfaces/interfaces';
import type { RootState } from '../index';

export const middlewareAddToCart = 
  (data: IProductData, inputCount: number): ThunkAction<void, RootState, unknown, AnyAction> => 
  (dispatch, getState) => {
    const { id, name, price } = data;
    const state: RootState = getState();
    const cartProduct = state.cart.find((product) => product.id === id);
    const product = state.products.find((product) => product.id === id) as IProductData; // нужна ли эта строчка? мы ведь и так передаем ProductData!
    const prevCount = cartProduct ? cartProduct.quantity : 0;
    const newQuantity = product.inStock === 0 ? prevCount: prevCount + inputCount;
    const newProductInCart = {
      id,
      name,
      price,
      quantity: newQuantity,
      totalPrice: newQuantity * price,
    };
    addToCart(newProductInCart)
        .then((resProductData) => {
          if (resProductData !== null) {
            dispatch(addedToCart(resProductData));
          }
        })
        .catch((err) => console.log(err));
};

export const middlewareFetchCart =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    fetchCart()
      .then((data) => {
        if (data !== null) {
          dispatch(cartFetched(data));
        }
      })
      .catch((err) => console.log(err));
};

export const middlewareRemoveProduct =
  (id: number): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    removeFromCart(id).then(() => dispatch(removedFromCart(id)));
};


export const middlewareClearCart =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    clearCart().then(() => dispatch(cartCleared()));
};
