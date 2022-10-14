import { useDispatch } from 'react-redux';
import { middlewareAddToCart } from '../middlewares/cart.js';
import middlewareChangedAmount from '../middlewares/products.js';
// import { addToCart } from '../api/routes.js';
// import { addedToCart } from '../store/actions/cartActions.js';
// import { changedAmount } from '../store/actions/productsActions.js';
// import styles from '../styles/ItemCard.module.css';

const AddButton = ({ data, setCurrentData, inputCount, style }) => {;
  const { inStock } = data;
  const dispatch = useDispatch();
  const handleAdd = (data) => () => {
    dispatch(middlewareAddToCart(data, inputCount));
    dispatch(middlewareChangedAmount(data.id, inputCount));
  };

  return (
    <button
      onClick={handleAdd(data)}
      className={style}
      disabled={inStock === 0}
      >
      {inStock > 0 ? 'В корзину' : 'Нет в наличии'}
    </button>
  );
};

export default AddButton;
