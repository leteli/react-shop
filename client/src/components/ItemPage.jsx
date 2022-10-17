import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productsFetched from '../store/actions/productsActions.js';
import fetchProducts, { fetchProductById } from '../api/routes.js';
import useLoginModalContext from '../hooks/useLoginModalContext.js';
import Layout from './Layout.jsx';
import AddButton from './AddButton.jsx';
import EditForm from './EditForm.jsx';
import styles from '../styles/ItemPage.module.css';
import cardStyles from '../styles/ItemCard.module.css';

const ItemPage = () => {
  const params = useParams();
  const id = Number(params.id);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchProducts()
      .then((data) => dispatch(productsFetched(data)));
    }, [dispatch]);

  const currentData = useSelector((state) => state
    .products.find((pr) => pr.id === id));

  const { currentUser } = useLoginModalContext();

  const [inputCount, setInputCount] = useState(1);

  const handleChange = async (e) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setInputCount(value);
    }
  };

  const [isEditMode, setEditMode] = useState(false);
  const toggleEditForm = () => setEditMode(!isEditMode);

  return (
    <Layout>
      {currentData && (isEditMode ? <EditForm data={currentData} toggleEditForm={toggleEditForm}/> : (
      <div className={styles.main}>
        <div className={styles.top}>
          <img className={styles.image} src={currentData.picture} alt="Обложка книги" />
          <div className={styles.info}>
            <h1 className={styles.title}>{currentData.name}</h1>
            <span className={styles.author}>{currentData.author}</span>
            <span className={styles.price}>{currentData.price} ₽</span>
            <span className={styles.inStock}>В наличии: {currentData.inStock} шт.</span>
            <div className={styles.amount}>
              <input
                onChange={handleChange}
                value={Number(inputCount).toString()}
                className={styles.counter}
                type="number"
              />
              {currentUser === 'user' ? (
                <AddButton
                  inputCount={inputCount}
                  data={currentData}
                  style={styles.btn} />
                ) : currentUser === 'admin' ? (
                  <button onClick={toggleEditForm} className={styles.btn}>Редактировать</button>
                ) : (
                <div className={cardStyles.needLogin}>Войдите, чтобы добавить в корзину</div>
              )}
            </div>
          </div>
        </div>
        <p className={styles.description}>{currentData.description}</p>
      </div>
      ))}
    </Layout>
  );
};

export default ItemPage;
