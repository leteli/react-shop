import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useLoginModalContext from '../hooks/useLoginModalContext.js';
import { getTotalAmount } from '../utils.js';
import { getTotalPrice } from '../utils.js';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
  const totalAmount = useSelector(getTotalAmount);
  const totalPrice = useSelector(getTotalPrice);
  const { toggleModal, isLoggedIn, changeLoginStatus, currentUser, setUser } = useLoginModalContext();
  const logOut = () => {
    changeLoginStatus();
    setUser(null);
  }

  return (
    <nav className={styles.navbar}>
      <NavLink className={styles.home} to="/">Главная</NavLink>
      <NavLink to="/about">О магазине</NavLink>
      <div className={styles.rightNav}>
        { currentUser === 'user' && (
        <NavLink to="/cart" className={styles.cart}>
          <img src="/assets/cart.svg" alt="Иконка корзины" />
          <div className={styles.cartInfo}>
            <span className={styles.cartTitle}>Корзина</span>
            <span>Товаров: {totalAmount}</span>
            <span>{totalPrice} ₽</span>
          </div>
        </NavLink>
        )}
        {isLoggedIn ? (
          <button onClick={logOut} className={styles.button}>Выход</button>
        ) : (
        <button onClick={toggleModal} className={styles.button}>Войти</button>
        )}
      </div>
    </nav>
  )
};

export default NavBar;
