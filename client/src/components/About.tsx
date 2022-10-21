import React from 'react';
import Layout from './Layout';
import layout from '../styles/Layout.module.css';
import styles from '../styles/About.module.css';

const About: React.FC = () => {
  return (
    <Layout>
      <h1 className={layout.title} data-testid="about-title">О магазине</h1>
      <p className={styles.text}><span className={styles.coloredText}>Книги</span> - независимый книжный магазин в центре Санкт-Петербурга.<br/>Мы предлагаем широкий ассортимент гуманитарной non-fiction литературы, поэзии, художественной литературы</p>
      <p className={styles.text}>Предлагаем вам сделать заказ в нашем удобном <span className={styles.coloredText}>онлайн-магазине</span>. Мы можем доставить ваш заказ по указанному адресу, также возможен самовывоз.</p>
    </Layout>
  );
};

export default About;
