import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import priceToNumber from '../utils.js';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
  const productsAmount = useSelector((state) => state.cart.length);
  const totalPrice = useSelector((state) => {
    return state.cart.length === 0 ? 0 : state.cart
      .reduce((acc, item) => acc + priceToNumber(item.price), 0);
  });
  
  return (
    <nav className={styles.navbar}>
      <NavLink className={styles.home} to="/">Главная</NavLink>
      <NavLink to="/about">О магазине</NavLink>
      <div className={styles.rightNav}>
        <NavLink to="/cart" className={styles.cart}>
          <img src="/assets/cart.svg" alt="Иконка корзины" />
          <div className={styles.cartInfo}>
            <span className={styles.cartTitle}>Корзина</span>
            <span>Товаров: {productsAmount}</span>
            <span>{totalPrice} ₽</span>
          </div>
        </NavLink>
        <button className={styles.button}>Войти</button>
      </div>
    </nav>
  )
};

export default NavBar;
