import { useDispatch } from 'react-redux';
import { middlewareAddToCart } from '../middlewares/cart.js';
import middlewareChangedAmount from '../middlewares/products.js';

const AddButton = ({ data, inputCount, style }) => {;
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
