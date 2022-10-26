import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from './productsReducer';
import cartReducer from './cartReducer';


const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export default rootReducer;
