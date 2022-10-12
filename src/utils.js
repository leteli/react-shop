const priceToNumber = (price) => {
  const [count, ] = price.split(' ');
  return Number(count);
};

export default priceToNumber;
