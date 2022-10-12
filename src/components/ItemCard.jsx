import { Link } from 'react-router-dom';
import styles from '../styles/ItemCard.module.css';

const ItemCard = ({ data }) => {
  const { id, name, author, picture, price, inStock } = data;
  return (
    <div className={styles.card}>
      <img className={styles.image} src={picture} alt="Обложка книги" />
      <Link to={`/products/${id}`}><h2 className={styles.title}>{name}</h2></Link>
      <span>{author}</span>
      <span className={styles.price}>{price}</span>
      <button className={inStock ? styles.addBtn : styles.disabledBtn}>
        {inStock > 0 ? 'В корзину' : 'Нет в наличии'}
      </button>
    </div>
  );
};

export default ItemCard;
