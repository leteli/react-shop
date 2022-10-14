const cartFetched = (payload) => {
  return {
    type: 'cartFetched',
    payload,
  };
};

export const addedToCart = (payload) => {
  return {
    type: 'addedToCart',
    payload,
  };
};

export const removedFromCart = (id) => {
  return {
    type: 'removedFromCart',
    payload: id,
  };
};

export const cartCleared = () => {
  return {
    type: 'cartCleared',
  };
};
  
export default cartFetched;
