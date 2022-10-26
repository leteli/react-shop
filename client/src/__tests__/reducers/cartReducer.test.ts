import cartReducer from '../../store/reducers/cartReducer';
import cartFetched, {
  addedToCart,
  removedFromCart,
  cartCleared,
} from '../../store/actions/cartActions';
import { cartProduct, cartNotEmpty } from '../stateFixture';

describe('test cart reducer and action creators', () => {
  test('cart fetched', () => {
    const action = cartFetched(cartNotEmpty);
    expect(cartReducer([], action)).toEqual(cartNotEmpty);
  });

  test('added to cart', () => {
    const action = addedToCart(cartProduct);
    expect(cartReducer([], action)).toEqual([cartProduct]);
  });

  test('removed from cart', () => {
    const action = removedFromCart(10);
    const cartAfterRemove = cartNotEmpty
      .filter((pr) => pr.id !== 10);
    expect(cartReducer(cartNotEmpty, action)).toEqual(cartAfterRemove);
  });
  test('cleared cart', () => {
    const action = cartCleared();
    expect(cartReducer(cartNotEmpty, action)).toEqual([]);
  });
});
