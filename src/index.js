import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import StoreProvider from './components/StoreProvider.jsx';
import App from './components/App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
