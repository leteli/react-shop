import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';

import rootReducer, { store } from './store/reducers/rootReducer';
import LoginProvider from './components/LoginProvider';
import App from './components/App';
import './styles/index.css';


const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
  <LoginProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </LoginProvider>
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
