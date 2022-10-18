import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';
import useLoginModalContext from '../hooks/useLoginModalContext';
import { getTotalAmount } from '../utils';
import { getTotalPrice } from '../utils';
import styles from '../styles/NavBar.module.css';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const cart = useAppSelector((state) => state.cart);
  const totalAmount = cart.length === 0 ? 0 : getTotalAmount(cart);
  const totalPrice = cart.length === 0 ? 0 : getTotalPrice(cart);
  const { toggleModal, isLoggedIn, changeLoginStatus, currentUser, setUser } = useLoginModalContext();
  const logOut = () => {
    changeLoginStatus();
    setUser(null);
    navigate('/');
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
