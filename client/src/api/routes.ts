import { IProductData, ICartProductData } from '../interfaces/interfaces';

const fetchProducts = async (): Promise<IProductData[] | null> => {
  try {
    const res = await fetch('/products');
    const data = await res.json();
    return data;
  } catch(err) {
    console.log(err);
    return null;
  }
};

export const fetchProductById = async (id: number): Promise<IProductData | null> => {
  try {
    const rawRes = await fetch(`/products/${id}`);
    const resData = await rawRes.json();
    return resData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const updateProduct = async (data: IProductData): Promise<IProductData | null> => {
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
    return null;
  }
};

export const fetchCart = async (): Promise<ICartProductData[] | null> => {
  try {
    const rawRes = await fetch('/cart/all');
    const resData = await rawRes.json();
    return resData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const addToCart = async (data: ICartProductData): Promise<ICartProductData | null> => {
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
    return null;
  }
};

export const removeFromCart = async (id: number): Promise<ICartProductData | null> => {
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
    return null;
  }
};

export const clearCart = async (): Promise<[] | null> => {
  try {
  const res = await fetch('cart/clear', {
      method: 'DELETE',
    });
    const resData = await res.json();
    return resData;
  } catch(err) {
    console.log(err);
    return null;
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
  status?: number;
}

export const checkAuth = async (userData: UserData): Promise<LoginResponse | null> => {
  try {
    const rawResponse = await fetch('/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
    });
    if (rawResponse.status === 401) {
      return rawResponse;
    }
    const response = await rawResponse.json();
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default fetchProducts;
