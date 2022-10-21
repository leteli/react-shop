import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { render } from "../customRender";
import userEvent from "@testing-library/user-event";
import App from '../../components/App';
import { setGlobalFetch } from "../api/routes.test";
import state, { productData } from "../stateFixture";

describe('test item page', () => {
  test('renders item page in logout mode', async () => {
    setGlobalFetch(state.products);
    render(<App />);
    const itemLink1 = await screen.findByTestId('item-link-1');
    setGlobalFetch(state.products);
    userEvent.click(itemLink1);
    await waitFor(() => {
      expect(screen.getByTestId('item-page-1')).toBeInTheDocument();
    });
    await expect(screen.getByTestId('name-field')).toHaveTextContent(productData.name);
    await expect(screen.getByTestId('author-field')).toHaveTextContent(productData.author);
    await expect(screen.getByTestId('price-field')).toHaveTextContent(`${productData.price} ₽`);
    await expect(screen.getByTestId('in-stock-field')).toHaveTextContent(`В наличии: ${productData.inStock} шт.`);
    await expect(screen.getByTestId('description-field')).toHaveTextContent(productData.description);
    await expect(screen.getByText(/Войдите, чтобы добавить в корзину/i)).toBeInTheDocument();
  });

  test('open edit form as admin and close it', async () => {
    setGlobalFetch(state.products);
    render(<App />, { isLoggedIn: true, currentUser: 'admin'});
    const itemLink1 = await screen.findByTestId('item-link-1');
    setGlobalFetch(state.products);
    userEvent.click(itemLink1);
    await waitFor(() => {
      expect(screen.getByTestId('item-page-1')).toBeInTheDocument();
    });
    const editBtn = screen.getByTestId('edit-btn');
    expect(editBtn).toBeInTheDocument();
    userEvent.click(editBtn);
    await waitFor(() => {
      expect(screen.getByTestId('edit-form-1')).toBeInTheDocument();
    });
    const cancelBtn = await screen.findByTestId('cancel-edit-btn');
    userEvent.click(cancelBtn);
    await waitFor(() => {
      expect(screen.queryByTestId('edit-form-1')).not.toBeInTheDocument();
    });
  });
});
