import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { middlewareFetchCart, middlewareClearCart, middlewareRemoveProduct } from '../middlewares/cart';
import Layout from './Layout';
import { getTotalPrice } from '../utils';
import layout from '../styles/Layout.module.css';
import styles from '../styles/Cart.module.css';

import { ICartProductData } from '../interfaces/interfaces';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => dispatch(middlewareFetchCart()), [dispatch]);
  const cartProducts = useAppSelector((state): ICartProductData[] => state.cart);
  const handleDelete = (id: number) => () => dispatch(middlewareRemoveProduct(id));
  const cart = useAppSelector((state) => state.cart);
  const totalPrice = cart.length === 0 ? 0 : getTotalPrice(cart);
  const handleClear = () => dispatch(middlewareClearCart());

  return (
    <Layout>
      <h1 className={layout.title}>Корзина</h1>
      {cartProducts.length === 0 ? <p>Товары не добавлены</p> : (
      <>
      <table className={styles.cart}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Цена</th>
            <th className={styles.nowrap}>Кол-во</th>
            <th>Итого</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {cartProducts.map((product) => {
          const {id, name, price, quantity, totalPrice } = product;
          return (
          <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td className={styles.nowrap}>{price} ₽</td>
            <td>{quantity}</td>
            <td>{totalPrice}</td>
            <td>
              <button className={styles.delete} onClick={handleDelete(id)}>Удалить</button>
            </td>
          </tr>
          );
        })}
        </tbody>
      </table>
      <div>
        <p className={styles.total}>Итого: {totalPrice} ₽</p>
        <div className={styles.btnGroup}>
          <button className={styles.clear} onClick={handleClear}>Очистить</button>
          <button className={styles.send}disabled={true}>Оплатить</button>
        </div>
      </div>
    </>)}
    </Layout>
  );
};

export default Cart;
