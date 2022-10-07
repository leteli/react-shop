import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <NavLink to="/">Главная</NavLink>
      <NavLink to="/about">О магазине</NavLink>
      <NavLink to="/cart">Корзина</NavLink>
      <button>Войти</button>
    </nav>
  )
};

export default NavBar;
