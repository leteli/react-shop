const cartFetched = (data) => {
  return {
    type: 'cartFetched',
    payload: data,
  };
};
  
  
export const addedToCart = (data, newCountInCart) => {
  return {
    type: 'addedToCart',
    payload: { data, newCountInCart },
  };
};

export const deletedFromCart = (id) => {
  return {
    type: 'deletedFromCart',
    payload: id,
  };
};

export const cartCleared = () => {
  return {
    type: 'cartCleared',
  };
};
  
export default cartFetched;
