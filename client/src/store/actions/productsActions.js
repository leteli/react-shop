const productsFetched = (data) => {
  return {
    type: 'productsFetched',
    payload: data,
  };
};

export const productUpdated = (payload) => {
  return {
    type: 'productUpdated',
    payload,
  };
};


export default productsFetched;
