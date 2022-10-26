import React from 'react';
import { useAppDispatch } from '../hooks/reduxHooks';
import { middlewareAddToCart } from '../middlewares/cart';
import middlewareChangedAmount from '../middlewares/products';

import { IProductData } from '../interfaces/interfaces';

interface Props {
  data: IProductData;
  inputCount: number;
  style: string,
};

const AddButton: React.FC<Props> = ({ data, inputCount, style }) => {;
  const dispatch = useAppDispatch();
  const handleAdd = (data: IProductData) => () => {
    dispatch(middlewareAddToCart(data, inputCount));
    dispatch(middlewareChangedAmount(data.id, inputCount));
  };

  return (
    <button
      data-testid={`item-add-btn-${data.id}`}
      onClick={handleAdd(data)}
      className={style}
      disabled={data.inStock === 0}
      >
      {data.inStock > 0 ? 'В корзину' : 'Нет в наличии'}
    </button>
  );
};

export default AddButton;
