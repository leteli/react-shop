import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';
import useLoginModalContext from '../hooks/useLoginModalContext';
import AddButton from './AddButton';
import styles from '../styles/ItemCard.module.css';

import { IProductData } from '../interfaces/interfaces';

interface Props {
  data: IProductData;
};

const ItemCard: React.FC<Props> = ({ data }) => {
  const { id, name, author, picture, price, inStock } = data;
  const { isLoggedIn, currentUser } = useLoginModalContext();
  // const prevCount = useAppSelector((state) => {
  //   const cartProduct = state.cart.find((product) => product.id === id);
  //   return cartProduct ? cartProduct.quantity : 0;
  // });
  return (
    <div key={id} className={styles.card} data-testid="item-card">
      <img className={styles.image} src={picture} alt="Обложка книги" />
      <Link to={`/products/${id}`} data-testid={`item-link-${id}`}><h2 className={styles.title}>{name}</h2></Link>
      <span>{author}</span>
      <span className={styles.price}>{price} ₽</span>
      { currentUser === 'user' ? (
      <AddButton
        inputCount={1}
        data={data}
        style={inStock !== 0 ? styles.addBtn : styles.disabledBtn} />
      ) : isLoggedIn ? null : <div className={styles.needLogin}>Войдите, чтобы добавить в корзину</div>}
    </div>
  );
};

export default ItemCard;
