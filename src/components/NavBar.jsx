import { NavLink } from 'react-router-dom';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink className={styles.home} to="/">Главная</NavLink>
      <NavLink to="/about">О магазине</NavLink>
      <div className={styles.rightNav}>
        <NavLink to="/cart" className={styles.cart}>
          <img src="/assets/cart.svg" alt="Иконка корзины" />
          <div className={styles.cartInfo}>
            <span className={styles.cartTitle}>Корзина</span>
            <span>4 товара</span>
            <span>2000 ₽</span>
          </div>
        </NavLink>
        <button className={styles.button}>Войти</button>
      </div>
    </nav>
  )
};

export default NavBar;
