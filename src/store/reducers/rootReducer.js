import { combineReducers } from 'redux';
import productsReducer from './productsReducer.js';
// import usersReducer from './usersReducer.js';
import cartReducer from './cartReducer.js';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  // users: usersReducer, // мб не нужен
});

export default rootReducer;
