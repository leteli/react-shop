const productsReducer = (state = [], action) => {
  switch (action.type) {
    case 'productsFetched': {
      return action.payload;
    }
    case 'changedAmount': {
      const { data, prevCountInCart, newCountInCart } = action.payload;
      const diff = newCountInCart - prevCountInCart;
      const changedItem = { ...data, inStock: data.inStock - diff };
      const restItems = state.filter((item) => item.id !== data.id);
      return [...restItems, changedItem];
    }
    case 'productEdited': { // мб изменить - передавать только нужные данные и id
      const newData = action.payload;
      const restData = state.filter((p) => p.id !== newData.id);
      return [...restData, newData];
    }
    default:
      return state;
  }
};

export default productsReducer;
