import { addToCart, fetchCart, removeFromCart, clearCart } from '../api/routes.js';
import cartFetched, { addedToCart, removedFromCart, cartCleared } from '../store/actions/cartActions.js';

export const middlewareAddToCart = (data, inputCount) => (dispatch, getState) => {
    const { id, name, price } = data;
    const state = getState();
    const cartProduct = state.cart.find((product) => product.id === id);
    const product = state.products.find((product) => product.id === id);
    const prevCount = cartProduct ? cartProduct.quantity : 0;
    const newQuantity = prevCount + inputCount > product.inStock ? product.inStock : prevCount + inputCount;
    console.log(newQuantity, product.inStock);
    const newProductInCart = {
      id,
      name,
      price,
      quantity: newQuantity,
      totalPrice: newQuantity * price,
    };
    addToCart(newProductInCart)
        .then((resProductData) => dispatch(addedToCart(resProductData)))
        .catch((err) => console.log(err));
};

export const middlewareFetchCart = () => (dispatch) => {
  fetchCart().then((data) => dispatch(cartFetched(data)));
};

export const middlewareRemoveProduct = (id) => (dispatch, getState) => {
  removeFromCart(id).then(() => dispatch(removedFromCart(id)));
}


export const middlewareClearCart = () => (dispatch) => {
  clearCart().then(() => dispatch(cartCleared()));
};
