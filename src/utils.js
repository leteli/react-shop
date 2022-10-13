const priceToNumber = (price) => {
  const [count, ] = price.split(' ');
  return Number(count);
};

export const getTotalAmount = (state) => {
  return state.cart.length === 0 ? 0 : state.cart
    .reduce((acc, item) => acc + item.quantity, 0);
};

export const getTotalPrice = (state) => {
  return state.cart.length === 0 ? 0 : state.cart
    .reduce((acc, item) => acc + item.totalPrice, 0);
};

export default priceToNumber;
