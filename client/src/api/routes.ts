import { IProductData, ICartProductData } from '../interfaces/interfaces';
import API_URL from './constants';

const fetchProducts = async (): Promise<IProductData[] | null> => {
  try {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    return data;
  } catch(err) {
    console.log(err);
    return null;
  }
};

export const fetchProductById = async (id: number): Promise<IProductData | null> => {
  try {
    const rawRes = await fetch(`${API_URL}/products/${id}`);
    const resData = await rawRes.json();
    return resData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const updateProduct = async (data: IProductData): Promise<IProductData | null> => {
  try {
    const rawRes = await fetch(`${API_URL}/products/${data.id}`, {
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
    const rawRes = await fetch(`${API_URL}/cart/all`);
    const resData = await rawRes.json();
    return resData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const addToCart = async (data: ICartProductData): Promise<ICartProductData | null> => {
  try {
  const rawRes = await fetch(`${API_URL}/cart/add`, {
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
    const rawRes = await fetch(`${API_URL}/cart/remove`, {
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
  const res = await fetch(`${API_URL}cart/clear`, {
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
  errorStatus?: number;
}

export const checkAuth = async (userData: UserData): Promise<LoginResponse> => {
    const rawResponse = await fetch(`${API_URL}/auth`, {
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
