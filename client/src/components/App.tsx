import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import ItemPage from './ItemPage';
import Cart from './Cart';
import About from './About';
import NotFound from './NotFound';
import LoginModal from './LoginModal';
import useLoginModalContext from '../hooks/useLoginModalContext';

const App: React.FC = () => {
  const { isModalOpen } = useLoginModalContext();
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ItemPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {isModalOpen && <LoginModal /> }
    </BrowserRouter>
  );
}

export default App;
