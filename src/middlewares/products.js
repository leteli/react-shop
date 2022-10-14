import { updateProduct } from '../api/routes.js';
import { productUpdated } from '../store/actions/productsActions.js';

const middlewareChangedAmount = (id, inputCount) => (dispatch, getState) => {
  const state = getState();
  const cartProduct = state.cart.find((product) => product.id === id);
  const prevCount = cartProduct ? cartProduct.quantity : 0;
  const newQuantity = prevCount + inputCount;
  const quantityDiff = newQuantity - prevCount;
  const product = state.products.find((product) => product.id === id);
  const diff = product.inStock - quantityDiff;
  const inStock = diff < 0 ? 0 : diff;
  const newProduct = { ...product, inStock };
  updateProduct(newProduct)
    .then((data) => dispatch(productUpdated(data)));
};

export const middlewareUpdatedProduct = (data) => (dispatch) => {
  updateProduct(data)
    .then((data) => dispatch(productUpdated(data)));
};

export default middlewareChangedAmount;

