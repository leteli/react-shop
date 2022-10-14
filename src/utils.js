export const getTotalAmount = (state) => {
  return state.cart.length === 0 ? 0 : state.cart
    .reduce((acc, item) => acc + item.quantity, 0);
};

export const getTotalPrice = (state) => {
  return state.cart.length === 0 ? 0 : state.cart
    .reduce((acc, item) => acc + item.totalPrice, 0);
};

// const validate = (data) => {
//   for (const key in values) {
//       const { value } = values[key];
//   }
// }

const validate = (formData) => {
  const entries = formData.entries();
  const validatedData = {};
  for (const [name, rawValue] of entries) {
    const value = rawValue.trim();
    if (value === '') {
      validatedData[name] = { isValid: false, message: 'Поле не должно быть пустым' };
    } else if (name === 'description'  && value.length > 1000) {
      validatedData[name] = { isValid: false, message: 'Не более 600 символов' };
    } else if (name === 'description') {
      validatedData[name] = { isValid: true, value };
    } else if (value.length > 60) {
      validatedData[name] = { isValid: false, message: 'Не более 30 символов' };
    } else {
      validatedData[name] = { isValid: true, value };
    }
  }
  return validatedData;
};

export const getUpdatedData = (validatedData) => {
  const { name, author, price, inStock, description } = validatedData;
  return {
    name: name.value,
    author: author.value,
    price: price.value,
    inStock: inStock.value,
    description: description.value,
  }
};


export default validate;