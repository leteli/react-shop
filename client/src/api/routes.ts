import { IProductData, ICartProductData } from '../interfaces/interfaces';

const fetchProducts = async (): Promise<IProductData[] | undefined> => {
  try {
    const res = await fetch('/products');
    const data = await res.json();
    return data;
  } catch(err) {
    console.log(err);
  }
};

export const fetchProductById = async (id: number): Promise<IProductData | undefined> => {
  try {
    const rawRes = await fetch(`/products/${id}`);
    const resData = await rawRes.json();
    return resData;
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = async (data: IProductData): Promise<IProductData | undefined> => {
  try {
    const rawRes = await fetch(`/products/${data.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    const resData = await rawRes.json();
    return resData;
  } catch (err) {
    console.log(err);
  }
};

export const fetchCart = async (): Promise<ICartProductData[] | undefined> => {
  try {
    const rawRes = await fetch('/cart/all');
    const resData = await rawRes.json();
    return resData;
  } catch (err) {
    console.log(err);
  }
};

export const addToCart = async (data: ICartProductData): Promise<ICartProductData | undefined> => {
  try {
  const rawRes = await fetch('/cart/add', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  const resData = await rawRes.json();
  return resData;
  } catch (err) {
    console.log(err);
  }
};

export const removeFromCart = async (id: number): Promise<ICartProductData | undefined> => {
  try {
    const rawRes = await fetch('/cart/remove', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id }),
    });
    const resData = await rawRes.json();
    return resData;
  } catch (err) {
    console.log(err);
  }
};

export const clearCart = async (): Promise<void> => {
  try {
    await fetch('cart/clear', {
      method: 'DELETE',
    });
  } catch (err) {
    console.log(err);
  }
};

interface LoginData {
  login: string;
}

interface UserData extends LoginData {
  password: string;
};

interface LoginResponse {
  login?: string;
  errorStatus?: number;
}

export const checkAuth = async (userData: UserData): Promise<LoginResponse> => {
  const rawResponse = await fetch('/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData),
  });
  const response = await rawResponse.json();
  return response;
};

export default fetchProducts;
