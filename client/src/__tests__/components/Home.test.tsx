import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { render } from "../customRender";
import userEvent from "@testing-library/user-event";
import Home from "../../components/Home";
import state from "../stateFixture";
import { setGlobalFetch } from '../api/routes.test';
import App from '../../components/App';

describe('test home page', () => {

  test('data fetching in useEffect', async () => {
    setGlobalFetch(state.products);
    render(<Home/>);
    const products = await screen.findAllByTestId('item-card');
    expect(products.length).toBe(10);
  });

  test('go to item page', async () => {
    setGlobalFetch(state.products);
    render(<App/>);
    const itemLink1 = await screen.findByTestId('item-link-1');
    setGlobalFetch(state.products);
    userEvent.click(itemLink1);
    await waitFor(() => {
      expect(screen.getByTestId('item-page-1')).toBeInTheDocument();
    });
  })
});
