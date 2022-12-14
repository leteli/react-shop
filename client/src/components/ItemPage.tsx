import React, { useState, useEffect, SyntheticEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import productsFetched from '../store/actions/productsActions';
import fetchProducts from '../api/routes';
import useLoginModalContext from '../hooks/useLoginModalContext';
import Layout from './Layout';
import AddButton from './AddButton';
import EditForm from './EditForm';
import styles from '../styles/ItemPage.module.css';
import cardStyles from '../styles/ItemCard.module.css';

const ItemPage: React.FC = () => {
  const params = useParams();
  const id = Number(params.id);
  const currentData = useAppSelector((state) => state.products.find((pr) => pr.id === id));
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetchProducts()
      .then((data) => {
        if (data !== null) {
          dispatch(productsFetched(data));
        }
      })
      .catch((err) => console.log(err));
    }, [dispatch]);

  const { currentUser } = useLoginModalContext();

  const [inputCount, setInputCount] = useState(1);

  const handleChange = async (e: SyntheticEvent) => {
    const value = Number((e.target as HTMLInputElement).value);
    if (value >= 0) {
      setInputCount(value);
    }
  };

  const [isEditMode, setEditMode] = useState(false);
  const toggleEditForm = () => setEditMode(!isEditMode);

  return (
    <Layout>
      {currentData && (isEditMode ? <EditForm data={currentData} toggleEditForm={toggleEditForm}/> : (
      <div className={styles.main} data-testid={`item-page-${id}`}>
        <div className={styles.top}>
          <img className={styles.image} src={currentData.picture} alt="Обложка книги" />
          <div className={styles.info}>
            <h1 className={styles.title} data-testid="name-field">{currentData.name}</h1>
            <span className={styles.author} data-testid="author-field">{currentData.author}</span>
            <span className={styles.price} data-testid="price-field">{currentData.price} ₽</span>
            <span className={styles.inStock} data-testid="in-stock-field">В наличии: {currentData.inStock} шт.</span>
            <div className={styles.amount}>
              <input
                data-testid="quantity-input"
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
                  <button onClick={toggleEditForm} className={styles.btn} data-testid="edit-btn">Редактировать</button>
                ) : (
                <div className={cardStyles.needLogin}>Войдите, чтобы добавить в корзину</div>
              )}
            </div>
          </div>
        </div>
        <p className={styles.description} data-testid="description-field">{currentData.description}</p>
      </div>
      ))}
    </Layout>
  );
};

export default ItemPage;
