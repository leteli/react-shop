import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../store/reducers/rootReducer.js';

const StoreProvider = (props) => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return (
    <Provider store={store}>
        {props.children}
    </Provider>
  )
};

export default StoreProvider;
