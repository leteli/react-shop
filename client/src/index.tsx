import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';
import LoginProvider from './components/LoginProvider';
import App from './components/App';
import './styles/index.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <LoginProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </LoginProvider>
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
