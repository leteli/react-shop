import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import Home from './Home.jsx';
import ItemPage from './ItemPage.jsx';
import Cart from './Cart.jsx';
import About from './About.jsx';
import NotFound from './NotFound.jsx';
import LoginModal from './LoginModal.jsx';
import useLoginModalContext from '../hooks/useLoginModalContext.js';

const App = () => {
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
      { isModalOpen && <LoginModal /> }
    </BrowserRouter>
  );
}

export default App;
