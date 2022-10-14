const cartReducer = (state = [], action) => {
  switch (action.type) {
    case 'cartFetched': {
      return [ ...action.payload];
    }
    case 'addedToCart': {
      const newProduct = action.payload;
      const restProducts = state.filter((item) => item.id !== newProduct.id);
      return [...restProducts, newProduct];
    }
    case 'removedFromCart': {
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
