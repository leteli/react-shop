const productsReducer = (state = [], action) => {
  switch (action.type) {
    case 'productsFetched': {
      return [...action.payload];
    }
    case 'productUpdated': {
      const newData = action.payload;
      const restData = state.filter((p) => p.id !== newData.id);
      const newState = [...restData, newData].sort((p1, p2) => p1.id - p2.id);
      return newState;
    }
    default:
      return state;
  }
};

export default productsReducer;
