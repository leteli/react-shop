const fetchProducts = async () => {
  try {
    const res = await fetch('/products');
    const data = await res.json();
    return data;
  } catch(err) {
    console.log(err);
  }
};

export const fetchProductById = async (id) => {
  try {
    const rawRes = await fetch(`/products/${id}`);
    const resData = await rawRes.json();
    return resData;
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = async (data) => {
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

export const fetchCart = async () => {
  try {
    const rawRes = await fetch('/cart/all');
    const resData = await rawRes.json();
    return resData;
  } catch (err) {
    console.log(err);
  }
};

export const addToCart = async (data) => {
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

export const removeFromCart = async (id) => {
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
