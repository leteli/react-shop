import { NavLink } from 'react-router-dom';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/">Главная</NavLink>
      <NavLink to="/about">О магазине</NavLink>
      <NavLink to="/cart">Корзина</NavLink>
      <button>Войти</button>
    </nav>
  )
};

export default NavBar;
