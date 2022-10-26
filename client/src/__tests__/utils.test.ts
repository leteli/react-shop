import { test, expect } from '@jest/globals';
import validate, { getTotalAmount, getTotalPrice, getUpdatedData } from '../utils';
import { ValidForm } from '../types/validation';

describe('reducer getTotal functions', () => {
  const cart = [
    { id: 1, name: 'Name', price: 150, quantity: 8, totalPrice: 1200 },
    { id: 2, name: 'Another name', price: 560, quantity: 3, totalPrice: 1680 }
  ];
  test('getTotalAmount with correct data', () => {
    expect(getTotalAmount(cart)).toBe(11);
  });
  test('getTotalPrice with correct data', () => {
    expect(getTotalPrice(cart)).toBe(2880);
  })
});

const validResult: ValidForm = {
  name: { value: 'Имя', isValid: true, error: ''},
  author: { value: 'Автор', isValid: true, error: ''},
  price: { value: '200', isValid: true, error: ''},
  inStock: { value: '10', isValid: true, error: ''},
  description: { value: 'Описание', isValid: true, error: ''},
};


describe('validate function', () => {
  const validEntries: Array<[string, string]> = [
    ['name', 'Имя'],
    ['author', 'Автор'] ,
    ['price', '200'],
    ['inStock', '10'],
    ['description', 'Описание'],
  ];

  const invalidEntries: Array<[string, string]> = [
    ['name', ''],
    ['author', 'Автор'] ,
    ['price', ('a').repeat(100)],
    ['inStock', ''],
    ['description', ('a').repeat(1100)],
  ];
  const invalidResult = {
    name: { isValid: false, error: 'Поле не должно быть пустым'},
    author: { value: 'Автор', isValid: true, error: ''},
    price: { isValid: false, error: 'Не более 60 символов'},
    inStock: { isValid: false, error: 'Поле не должно быть пустым'},
    description: { isValid: false, error: 'Не более 1000 символов'},
  };

  test('validate correct data', () => {
    expect(validate(validEntries)).toEqual(validResult);
  });
  test('validate incorrect data', () => {
    expect(validate(invalidEntries)).toEqual(invalidResult);
  });
});

describe('getUpdatedData function', () => {
  const updatedData = {
    name: 'Имя',
    author: 'Автор',
    price: 200,
    inStock: 10,
    description: 'Описание',
  };

  test('get product data for state', () => {
    expect(getUpdatedData(validResult)).toEqual(updatedData);
  });
});
