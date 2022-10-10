import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../store/reducers/rootReducer.js';

const StoreProvider = (props) => {
  const store = createStore(rootReducer);
  return (
    <Provider store={store}>
        {props.children}
    </Provider>
  )
};

export default StoreProvider;
