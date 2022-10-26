import React from "react";
import { screen } from "@testing-library/react";
import { render } from '../customRender';
import NavBar from '../../components/NavBar';

test('renders navigation bar', () => {
  render(<NavBar />);
  expect(screen.getByTestId('about-link')).toBeInTheDocument();
  expect(screen.getByTestId('home-link')).toBeInTheDocument();
  expect(screen.getByTestId('login-btn')).toBeInTheDocument();
});
