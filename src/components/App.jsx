import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import Home from './Home.jsx';
import Item from './Item.jsx';
import Cart from './Cart.jsx';
import About from './About.jsx';
import NotFound from './NotFound.jsx';
import '../styles/App.module.css';

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
