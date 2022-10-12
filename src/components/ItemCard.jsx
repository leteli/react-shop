import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addedToCart } from '../store/actions/cartActions.js'
import styles from '../styles/ItemCard.module.css';

const ItemCard = ({ data }) => {
  const { id, name, author, picture, price, inStock } = data;
  const dispatch = useDispatch();
  const handleAdd = (data) => () => dispatch(addedToCart(data));
  return (
    <div className={styles.card}>
      <img className={styles.image} src={picture} alt="Обложка книги" />
      <Link to={`/products/${id}`}><h2 className={styles.title}>{name}</h2></Link>
      <span>{author}</span>
      <span className={styles.price}>{price}</span>
      <button
        onClick={handleAdd(data)}
        className={inStock !== 0 ? styles.addBtn : styles.disabledBtn}
        disabled={inStock === 0}
      >
        {inStock > 0 ? 'В корзину' : 'Нет в наличии'}
      </button>
    </div>
  );
};

export default ItemCard;
