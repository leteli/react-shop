import { useState, useEffect } from 'react';
import Layout from './Layout.jsx';
import layout from '../styles/Layout.module.css';
import styles from '../styles/Home.module.css';
import ItemCard from './ItemCard.jsx';

const Home = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://127.0.0.1:8080/products');
      const data = await res.json();
      setItems(data);
    };
    fetchData();
  }, []);
  return (
    <Layout>
      <h1 className={layout.title}>Каталог книг</h1>
      <div className={styles.itemsContainer}>
        {items.length > 0 && items.map(item => <ItemCard key={item.id} data={item}/>)}
      </div>
    </Layout>
  );
};

export default Home;
