const cartFetched = (data) => {
  return {
    type: 'cartFetched',
    payload: data,
  };
};
  
  
export const addedToCart = (data) => {
  return {
    type: 'addedToCart',
    payload: data,
  };
};

export const changedAmount = (id, newCount) => {
  return {
    type: 'changedAmount',
    payload: { id, newCount },
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
