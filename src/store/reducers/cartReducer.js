import priceToNumber from '../../utils.js';

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case 'cartFetched': {
      return action.payload;
    }
    case 'addedToCart': {
      const { data, newCountInCart } = action.payload;
      const { id, name, price } = data;
      const itemInCart = state.find((item) => item.id === id);
      const restItems = state.filter((item) => item.id !== id);
      const newQuantity = itemInCart ? itemInCart.quantity + newCountInCart : newCountInCart;
      const newItemInCart = {
        id,
        name,
        price,
        quantity: newQuantity,
        totalPrice: newQuantity * priceToNumber(price),
      };
      return [...restItems, newItemInCart];
    }
    case 'deletedFromCart': {
      const id = action.payload;
      const restData = state.filter((item) => item.id !== id);
      return restData;
    }
    case 'cartCleared': {
      return [];
    }
    default:
      return state;
  }
};

export default cartReducer;
