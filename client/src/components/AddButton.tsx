import React from 'react';
import { useAppDispatch } from '../hooks/reduxHooks';
import { middlewareAddToCart } from '../middlewares/cart';
import middlewareChangedAmount from '../middlewares/products';

import { ProductData } from '../@types/stateData';

type Props = {
  data: ProductData;
  inputCount: number;
  style: string,
};

const AddButton: React.FC<Props> = ({ data, inputCount, style }) => {;
  const { inStock } = data;
  const dispatch = useAppDispatch();
  const handleAdd = (data: ProductData) => () => {
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
