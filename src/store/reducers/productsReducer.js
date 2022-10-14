const productsReducer = (state = [], action) => {
  switch (action.type) {
    case 'productsFetched': {
      return [...action.payload];
    }
    case 'productUpdated': {
      const newData = action.payload;
      const restData = state.filter((p) => p.id !== newData.id);
      return [...restData, newData];
    }
    default:
      return state;
  }
};

export default productsReducer;
