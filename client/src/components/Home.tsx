import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import fetchData from '../api/routes';
import productsFetched from '../store/actions/productsActions';
import Layout from './Layout';
import ItemCard from './ItemCard';
import layout from '../styles/Layout.module.css';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchData()
      .then((data) => {
        if (data !== undefined) {
          dispatch(productsFetched(data));
        }
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  const products = useAppSelector((state) => state.products);

  return (
    <Layout>
      <h1 className={layout.title}>Каталог книг</h1>
      <div className={styles.itemsContainer}>
        {products.length > 0 && products.map((product) => <ItemCard key={product.id} data={product} />)}
      </div>
    </Layout>
  );
};

export default Home;
