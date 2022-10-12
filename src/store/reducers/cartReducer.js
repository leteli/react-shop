const cartReducer = (state = [], action) => {
  switch (action.type) {
    case 'cartFetched': {
      return action.payload;
    }
    case 'addedToCart': {
      console.log([...state, action.payload]);
      return [...state, action.payload];
    }
    case 'changedAmount': {
      const { id, newCount } = action.payload;
      const prevItem = state.cart.find((item) => item.id === id);
      const changedItem = { ...prevItem, inStock: newCount };
      const restItems = state.cart.filter((item) => item.id !== id);
      return [...restItems, changedItem];
    }
    case 'deletedFromCart': {
      const id = action.payload;
      const restData = state.cart.filter((item) => item.id !== id);
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
