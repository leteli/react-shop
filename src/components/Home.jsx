import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productsFetched from '../store/actions/productsActions.js';
import Layout from './Layout.jsx';
import ItemCard from './ItemCard.jsx';
import layout from '../styles/Layout.module.css';
import styles from '../styles/Home.module.css';


const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://127.0.0.1:8080/products');
      const data = await res.json();
      dispatch(productsFetched(data));
    };
    fetchData();
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
