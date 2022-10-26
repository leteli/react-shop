import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../customRender';
import About from '../../components/About';

test('renders about page', () => {
  render(<About />);
  const aboutEl = screen.getByTestId('about-title');
  const descriptionEl = screen.getByText(/независимый книжный магазин/i);
  expect(aboutEl).toBeInTheDocument();
  expect(descriptionEl).toBeInTheDocument();
});
