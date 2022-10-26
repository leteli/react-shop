import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';
import useLoginModalContext from '../hooks/useLoginModalContext';
import { getTotalAmount, getTotalPrice } from '../utils';
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
      <NavLink className={styles.home} to="/" data-testid="home-link">Главная</NavLink>
      <NavLink to="/about" data-testid="about-link">О магазине</NavLink>
      <div className={styles.rightNav}>
        { currentUser === 'user' && (
        <NavLink to="/cart" className={styles.cart} data-testid="cart-link">
          <img src="/assets/cart.svg" alt="Иконка корзины" />
          <div className={styles.cartInfo}>
            <span className={styles.cartTitle}>Корзина</span>
            <span data-testid="nav-cart-total-quantity">Товаров: {totalAmount}</span>
            <span data-testid="nav-cart-total-price">{totalPrice} ₽</span>
          </div>
        </NavLink>
        )}
        {isLoggedIn ? (
          <button onClick={logOut} className={styles.button} data-testid="logout-btn">Выход</button>
        ) : (
        <button onClick={toggleModal} className={styles.button} data-testid="login-btn">Войти</button>
        )}
      </div>
    </nav>
  )
};

export default NavBar;
