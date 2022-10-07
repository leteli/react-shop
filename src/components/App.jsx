import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Item from './Item.jsx';
import About from './About.jsx';
import NotFound from './NotFound.jsx';
import '../styles/App.module.css';

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/item/:id" element={<Item />} />
      <Route path="/about" element={<About />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
