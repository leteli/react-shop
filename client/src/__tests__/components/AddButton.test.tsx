import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { render } from "../customRender";
import userEvent from "@testing-library/user-event";
import { setGlobalFetch } from "../api/routes.test";
import App from "../../components/App";
import state, {
  cartProduct1,
  cartProduct1Four,
  cartProduct2,
  cartProduct2Two,
  cartWithThreeProducts,
  cartWithSixProducts,
} from "../stateFixture";
import { getTotalPrice } from "../../utils";

describe('testing add button', () => {
  test("user adds products to cart from homepage", async () => {
    setGlobalFetch(state.products);
    render(<App />, { isLoggedIn: true, currentUser: 'user'});
    const addButton1 = await screen.findByTestId("item-add-btn-1");
    const addButton2 = await screen.findByTestId("item-add-btn-2");
    setGlobalFetch(cartProduct1);
    userEvent.click(addButton1);
    setGlobalFetch(cartProduct2);
    userEvent.click(addButton2);
    setGlobalFetch(cartProduct2Two);
    userEvent.click(addButton2);
    const totalPrice = getTotalPrice(cartWithThreeProducts);
    await waitFor(() => {
      expect(screen.getByTestId("nav-cart-total-quantity")).toHaveTextContent("Товаров: 3");
    });
    await waitFor(() => {
      expect(screen.getByTestId("nav-cart-total-price")).toHaveTextContent(`${totalPrice} ₽`);
    });
  });

  test('user adds products to cart from item page and checks cart page', async () => {
    setGlobalFetch(state.products);
    render(<App />, { isLoggedIn: true, currentUser: 'user'});
    const itemLink1 = await screen.findByTestId('item-link-1');
    setGlobalFetch(state.products);
    userEvent.click(itemLink1);
    await waitFor(() => {
      expect(screen.getByTestId('item-page-1')).toBeInTheDocument();
    });
    await waitFor(() => {
      const nameField = screen.getByTestId('name-field');
      expect(nameField).toHaveTextContent(cartProduct1.name);
    });
    const addButton = await screen.findByTestId('item-add-btn-1');
    const quantityInput = await screen.findByTestId('quantity-input');
    userEvent.clear(quantityInput);
    userEvent.type(quantityInput, '3');
    expect(quantityInput).toHaveValue(3);
    setGlobalFetch(cartProduct1Four);
    userEvent.click(addButton);
    await waitFor(() => {
      expect(screen.getByTestId("nav-cart-total-quantity"))
        .toHaveTextContent("Товаров: 6"); // вместе с предыдущим тестом - мок стор сохраняется!
    });
    await waitFor(() => {
      expect(screen.getByTestId("nav-cart-total-price"))
        .toHaveTextContent(`${getTotalPrice(cartWithSixProducts)} ₽`);
    });
  });

  test('user checks cart page', async () => {
    render(<App />, { isLoggedIn: true, currentUser: 'user'});
    const navCart = screen.getByTestId("cart-link");
    setGlobalFetch(cartWithSixProducts);
    userEvent.click(navCart);
    await waitFor(() => {
      expect(screen.queryByText(/Каталог/i)).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByTestId("cart-page-title")).toBeInTheDocument();
    });
    expect(screen.getByTestId('cart-page-total')).toHaveTextContent(`${getTotalPrice(cartWithSixProducts)} ₽`);
  });
});
