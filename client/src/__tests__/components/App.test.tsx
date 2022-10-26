import React from "react";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import { render } from "../customRender";
import userEvent from "@testing-library/user-event";
import { setGlobalFetch } from "../api/routes.test";
import App from "../../components/App";
import state from "../stateFixture";
import fetchProducts from '../../api/routes';
// import { IProductData } from "../../interfaces/interfaces";

describe("renders app in logout mode", () => {
  test("home and navbar render", () => {
    setGlobalFetch(state.products);
    render(<App />);
    expect(screen.getByText(/Каталог книг/i)).toBeInTheDocument();
    expect(screen.getByTestId("home-link")).toBeInTheDocument();
    expect(screen.getByTestId("about-link")).toBeInTheDocument();
  });

  test("navbar routing", () => {
    setGlobalFetch(state.products);
    render(<App />);
    const aboutLink = screen.getByTestId("about-link");
    const homeLink = screen.getByTestId("home-link");
    userEvent.click(aboutLink);
    expect(screen.getByText(/независимый книжный магазин/i)).toBeInTheDocument();
    userEvent.click(homeLink);
    expect(screen.getByText(/Каталог книг/i)).toBeInTheDocument();
  });

  test("log out mode by default", async () => {
    setGlobalFetch(state.products);
    render(<App />);
    expect(screen.getByText(/Войти/i)).toBeInTheDocument();
    expect(screen.queryByTestId("cart-link")).not.toBeInTheDocument();
    const loginToAdd = await screen.findAllByText(
      /Войдите, чтобы добавить в корзину/i
    );
    expect(loginToAdd).toHaveLength(10);
  });
});
