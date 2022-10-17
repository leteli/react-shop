import Layout from './Layout.jsx';
import layout from '../styles/Layout.module.css';

const NotFound = () => {
  return (
    <Layout>
      <h1 className={layout.title}>Что-то пошло не так...</h1>
      <p>Данной страницы не существует</p>
    </Layout>
  );
};

export default NotFound;
