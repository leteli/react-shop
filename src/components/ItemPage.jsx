import Layout from './Layout.jsx';
import styles from '../styles/ItemPage.module.css';

const ItemPage = () => {
  // let productData;
  // const { name, author, description, price, picture, inStock } = productData;
  return (
    <Layout>
      <div className={styles.main}>
      <div className={styles.top}>
        <img className={styles.image} src='/assets/item-img-1.jpg' alt="Обложка книги" />
        <div className={styles.info}>
          <h1 className={styles.title}>Империализм в XXI веке</h1>
          <span className={styles.author}>Смит Д.</span>
          <span className={styles.price}>900 ₽</span>
          <span className={styles.inStock}>В наличии: 4 шт.</span>
          <div className={styles.amount}>
            <input className={styles.counter} type="number" />
            <button className={styles.btn}>В корзину</button>
          </div>
        </div>
      </div>
      <p className={styles.description}>Остался ли империализм в далеком прошлом? Джон Смит показывает, что нет. Извлечение сверхприбылей одними странами из других продолжает играть определяющее значение для мировой экономики и в эпоху неолиберализма. Но, хотя сегодня империализм тоже может включать и прямые военные интервенции, они теперь не являются необходимостью. Ограбление глобального Юга осуществляется и во вполне «мирной» обстановке. Опираясь на громадный эмпирический материал, Смит демонстрирует механизмы такого мироустройства и вступает в полемику с представителями как неоклассического, так и неортодоксальных течений экономической мысли. Эта работа имеет важнейшее значение для понимания современного глобального капитализма. Книга была удостоена Мемориальной премии им. Пола Барана и Пола Суизи</p>
      </div>
    </Layout>
  )
};

export default ItemPage;
