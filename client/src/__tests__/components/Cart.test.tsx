import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { render } from "../customRender";
import userEvent from "@testing-library/user-event";
import { setGlobalFetch } from "../api/routes.test";
import Cart from '../../components/Cart';
import state, {
  cartProduct1Four,
  cartWithSixProducts,
} from "../stateFixture";
import { getTotalPrice } from "../../utils";
import { store } from '../customRender';
import productsFetched from "../../store/actions/productsActions";

describe("test cart page", () => {
  test('empty cart', () => {
    setGlobalFetch(state.cart);
    render(<Cart/>);
    expect(screen.getByText(/Товары не добавлены/)).toBeInTheDocument();
  });

  test('render cart content', async () => {
    setGlobalFetch(cartWithSixProducts);
    render(<Cart/>);
    await waitFor(() => {
      expect(screen.getByTestId("cart-table")).toBeInTheDocument();
    });
    expect(screen.getAllByTestId('cart-item')).toHaveLength(2);
    expect(screen.getByTestId('cart-page-total'))
      .toHaveTextContent(`${getTotalPrice(cartWithSixProducts)} ₽`);
    expect(screen.getByTestId('cart-page-checkout')).toBeDisabled();
  });

  test('remove item from cart and clear cart', async () => {
    store.dispatch(productsFetched(state.products));
    setGlobalFetch(cartWithSixProducts);
    render(<Cart/>);
    const removeBtns = await screen.findAllByTestId('cart-item-remove');
    expect(removeBtns).toHaveLength(2);
    const [removeItem1, ] = removeBtns;
    setGlobalFetch(cartProduct1Four);
    userEvent.click(removeItem1);
    await waitFor(() => {
      expect(screen.getAllByTestId('cart-item')).toHaveLength(1);
    });
    const clearBtn = screen.getByTestId('cart-page-clear');
    setGlobalFetch([]);
    userEvent.click(clearBtn);
    await waitFor(() => {
      expect(screen.getByText(/Товары не добавлены/)).toBeInTheDocument();
    })
  });
});
