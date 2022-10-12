import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './Layout.jsx';
import styles from '../styles/ItemPage.module.css';

const ItemPage = () => {
  const { id } = useParams();
  const currentData = useSelector((state) => state.products
    .find((product) => product.id === Number(id)));
  const { name, author, description, price, picture, inStock } = currentData;
  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.top}>
          <img className={styles.image} src={picture} alt="Обложка книги" />
          <div className={styles.info}>
            <h1 className={styles.title}>{name}</h1>
            <span className={styles.author}>{author}</span>
            <span className={styles.price}>{price}</span>
            <span className={styles.inStock}>В наличии: {inStock} шт.</span>
            <div className={styles.amount}>
              <input className={styles.counter} type="number" />
              <button className={styles.btn}>В корзину</button>
            </div>
          </div>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </Layout>
  )
};

export default ItemPage;
