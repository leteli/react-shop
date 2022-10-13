const productsFetched = (data) => {
  return {
    type: 'productsFetched',
    payload: data,
  };
};

export const productFetchedById = (data) => {
  return {
    type: 'productFetchedById',
    payload: data,
  };
};

export const changedAmount = (data, prevCountInCart, newCountInCart) => {
  return {
    type: 'changedAmount',
    payload: { data, prevCountInCart, newCountInCart },
  };
};

export const productEdited = (productData) => {
  return {
    type: 'productEdited',
    payload: productData,
  };
};


export default productsFetched;
