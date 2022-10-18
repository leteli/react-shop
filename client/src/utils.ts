import { ValidatedForm, InvalidForm, ValidForm } from './types/validation';
import { ICartProductData, IUpdatedData } from './interfaces/interfaces';

export const getTotalAmount = (cart: ICartProductData[]) => {
  return cart.reduce((acc: number, item) => acc + item.quantity, 0)
};

export const getTotalPrice = (cart: ICartProductData[]) => cart
    .reduce((acc: number, item) => acc + item.totalPrice, 0);

const validate = (formData: FormData): ValidatedForm => {
  const entries = formData.entries();
  const validatedData: ValidForm | InvalidForm = {};
  for (const [name, rawValue] of entries) {
    let value = rawValue;
    if (typeof rawValue === 'string') {
      value = rawValue.trim();
      if (value === '') {
        validatedData[name] = { isValid: false, error: 'Поле не должно быть пустым' };
      } else if (name === 'description'  && value.length > 1000) {
        validatedData[name] = { isValid: false, error: 'Не более 600 символов' };
      } else if (name === 'description') {
        validatedData[name] = { isValid: true, value, error: '' };
      } else if (value.length > 60) {
        validatedData[name] = { isValid: false, error: 'Не более 30 символов' };
      } else {
        validatedData[name] = { isValid: true, value,  error: '' };
      }
    }
  }
  return validatedData;
};

export const getUpdatedData = (validatedData: ValidatedForm): IUpdatedData => {
  const { name, author, price, inStock, description } = validatedData as ValidForm;
  return {
    name: name.value,
    author: author.value,
    price: Number(price.value),
    inStock: Number(inStock.value),
    description: description.value,
  }
};


export default validate;