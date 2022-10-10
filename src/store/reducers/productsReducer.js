const productsReducer = (state = [], action) => {
  switch (action.type) {
    case 'productsFetched': {
      return action.payload;
    }
    // case 'productFetchedById': { // мб не нужно
    //   return [...state, currentProduct: action.payload];
    // }
    case 'productEdited': { // мб изменить - передавать только нужные данные и id
      const newData = action.payload;
      const restData = state.products.filter((p) => p.id !== newData.id);
      return [...restData, newData];
    }
    default:
      return state;
  }
};

export default productsReducer;
