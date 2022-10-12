import { useDispatch } from 'react-redux';
import { addedToCart } from '../store/actions/cartActions.js';
import styles from '../styles/ItemCard.module.css';

const AddButton = ({ data, style }) => {;
  const { inStock } = data;
  const dispatch = useDispatch();
  const handleAdd = (data) => () => dispatch(addedToCart(data));
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
