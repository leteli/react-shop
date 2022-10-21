import { IProductData } from '../../interfaces/interfaces';

import fetchProducts, {
  fetchProductById,
  updateProduct,
  fetchCart,
  addToCart,
  removeFromCart,
  clearCart,
  checkAuth,
} from '../../api/routes';

import state, { cartProduct } from '../stateFixture';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(''),
})) as jest.Mock;

export const setGlobalFetch = (mockData: any) => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(mockData),
  })) as jest.Mock;
};

describe('test api', () => {
  describe('products data api', () => {
    test('fetch all products data', async () => {
      setGlobalFetch(state.products);
      const response = await fetchProducts();
      expect(response).toEqual(state.products);
    });

    test('fetch product data by id', async () => {
      const product1 = state.products.find((pr) => pr.id === 1);
      setGlobalFetch(product1);
      expect(await fetchProductById(1)).toEqual(product1);
    });

    test('update product', async () => {
      const product3 = state.products.find((pr) => pr.id === 3) as IProductData;
      const newData = {...product3, name: 'Новое имя', inStock: 1000, description: 'Новое описание'};
      setGlobalFetch(newData);
      expect(await updateProduct(newData)).toEqual(newData);
    });
  });

  describe('cart data api', () => {

    test('fetch cart', async () => {
      setGlobalFetch(state.cart)
      expect(await fetchCart()).toEqual(state.cart);
    });

    test('add to cart', async () => {
      setGlobalFetch(cartProduct)
      expect(await addToCart(cartProduct)).toEqual(cartProduct);
    });

    test('remove from cart', async () => {
      setGlobalFetch(cartProduct)
      expect(await removeFromCart(cartProduct.id)).toEqual(cartProduct);
    });

    test('clear cart', async () => {
      setGlobalFetch([]);
      expect(await clearCart()).toEqual([]);
    });
  });

  describe('authenticate user', () => {
    test('user with user role', async () => {
      const user = { login: 'user', password: 'user'};
      setGlobalFetch({ login: 'user'});
      expect(await checkAuth(user)).toEqual({ login: 'user'});
    });

    test('user with admin role', async () => {
      const admin = { login: 'admin', password: 'admin'};
      setGlobalFetch({ login: 'admin'});
      expect(await checkAuth(admin)).toEqual({ login: 'admin'});
    });

    test('incorrect data', async () => {
      const incorrectData = { login: 'aa', password: 'jj'};
      setGlobalFetch({ errorStatus: 401 }); // mb throw error on server?
      expect(await checkAuth(incorrectData)).toEqual({ errorStatus: 401});
    });
  });
});
