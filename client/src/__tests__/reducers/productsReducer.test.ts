import productsReducer from '../../store/reducers/productsReducer';
import productsFetched, { productUpdated } from '../../store/actions/productsActions';
import state from '../stateFixture';
import { IProductData } from '../../interfaces/interfaces';

describe('test products reducer and action creators', () => {
  test('products fetched', () => {
    const action = productsFetched(state.products);
    expect(productsReducer([], action)).toEqual(state.products);
  });
  test('product updated', () => {
    const product3 = state.products.find((pr) => pr.id === 3) as IProductData;
    const restState = state.products.filter((pr) => pr.id !== 3);
    const newData = { ...product3, name: 'Новое имя', inStock: 1000, description: 'Новое описание' };
    const newState = [...restState, newData].sort((a, b) => a.id - b.id);
    const action = productUpdated(newData);
    expect(productsReducer(state.products, action)).toEqual(newState);
  });
});
