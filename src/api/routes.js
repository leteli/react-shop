const fetchProducts = async () => {
  const res = await fetch('/products');
  const data = await res.json();
  return data;
};

export const fetchProductById = async (id) => {
  const rawRes = await fetch(`/products/${id}`);
  const resData = await rawRes.json();
  return resData;
};

export const updateProduct = async (data) => {
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
};

export const fetchCart = async () => {
  const rawRes = await fetch('/cart/all');
  const resData = await rawRes.json();
  return resData;
};

export const addToCart = async (data) => {
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
};

export const removeFromCart = async (id) => {
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
};

export const clearCart = async () => {
  try {
    await fetch('cart/clear', {
      method: 'DELETE',
    });
  } catch (err) {
    console.log(err);
  }
};

export const checkAuth = async (loginData) => {
  const rawResponse = await fetch('/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData),
  });
  const response = await rawResponse.json();
  return response;
};

export default fetchProducts;
