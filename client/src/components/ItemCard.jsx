import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useLoginModalContext from '../hooks/useLoginModalContext.js';
import AddButton from './AddButton.jsx';
import styles from '../styles/ItemCard.module.css';

const ItemCard = ({ data }) => {
  const { id, name, author, picture, price, inStock } = data;
  const { isLoggedIn, currentUser } = useLoginModalContext();
  const prevCount = useSelector((state) => {
    const cartProduct = state.cart.find((product) => product.id === id);
    return cartProduct ? cartProduct.quantity : 0;
  });
  return (
    <div key={id} className={styles.card}>
      <img className={styles.image} src={picture} alt="Обложка книги" />
      <Link to={`/products/${id}`}><h2 className={styles.title}>{name}</h2></Link>
      <span>{author}</span>
      <span className={styles.price}>{price} ₽</span>
      { currentUser === 'user' ? (
      <AddButton
        inputCount={1}
        prevCount={prevCount}
        data={data}
        style={inStock !== 0 ? styles.addBtn : styles.disabledBtn} />
      ) : isLoggedIn ? null : <div className={styles.needLogin}>Войдите, чтобы добавить в корзину</div>}
    </div>
  );
};

export default ItemCard;
