import { useDispatch, useSelector } from 'react-redux';
import { deletedFromCart, cartCleared } from '../store/actions/cartActions.js';
import Layout from './Layout.jsx';
import { getTotalPrice } from '../utils.js';
import layout from '../styles/Layout.module.css';
import styles from '../styles/Cart.module.css';

const Cart = () => {
  const dispatch = useDispatch();
  // const cartProducts = useSelector((state) => state.cart);
  const handleDelete = (id) => () => dispatch(deletedFromCart(id));
  const totalPrice = useSelector(getTotalPrice);
  const handleClear = () => dispatch(cartCleared());

  const cartProducts = [{ id: 6,
    name: 'Воззвание к жизни: против тирании рынка и государства',
    price: '470 ₽',
    quantity: 2,
    totalPrice: '940 ₽',
  }];

  return (
    <Layout>
      <h1 className={layout.title}>Корзина</h1>
      <table className={styles.cart}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Цена</th>
            <th className={styles.nowrap}>Кол-во</th>
            <th>Итого</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {cartProducts.map((product) => {
          const {id, name, price, quantity, totalPrice } = product;
          return (
          <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td className={styles.nowrap}>{price}</td>
            <td>{quantity}</td>
            <td>{totalPrice}</td>
            <td>
              <button className={styles.delete} onClick={handleDelete(id)}>Удалить</button>
            </td>
          </tr>
          );
        })}
        </tbody>
      </table>
      <div>
        <p className={styles.total}>Итого: {totalPrice} ₽</p>
        <div className={styles.btnGroup}>
          <button className={styles.clear} onClick={handleClear}>Очистить</button>
          <button className={styles.send}disabled={true}>Оплатить</button>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
