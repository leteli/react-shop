import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchData from '../api/routes.js';
import productsFetched from '../store/actions/productsActions.js';
import Layout from './Layout.jsx';
import ItemCard from './ItemCard.jsx';
import layout from '../styles/Layout.module.css';
import styles from '../styles/Home.module.css';


const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData()
      .then((data) => dispatch(productsFetched(data)));
  }, [dispatch]);

  const products = useSelector((state) => state.products);

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