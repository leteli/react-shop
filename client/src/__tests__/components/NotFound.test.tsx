import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../../components/NotFound';

test('renders not found page', () => {
  render(<NotFound />);
  const goneWrongEl = screen.getByText(/Что-то пошло не так/i);
  const notExistEl = screen.getByText(/Данной страницы не существует/i);
  expect(goneWrongEl).toBeInTheDocument();
  expect(notExistEl).toBeInTheDocument();
});
