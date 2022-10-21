import React from "react";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import { render } from "../customRender";
import userEvent from "@testing-library/user-event";
import { setGlobalFetch } from "../api/routes.test";
import state from '../stateFixture';
import App from "../../components/App";

describe("testing app login", () => {
  describe("login modal options", () => {
    test("open login modal and close it with cancel button", async () => {
      setGlobalFetch(state.products);
      render(<App />);
      const loginBtn = screen.getByText(/Войти/i);
      userEvent.click(loginBtn);
      await waitFor(() => {
        expect(screen.getByText(/Авторизация/i)).toBeInTheDocument();
      });
      const cancelBtn = screen.getByTestId("cancel-login-btn");
      userEvent.click(cancelBtn);
      expect(screen.queryByText(/Авторизация/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Каталог книг/i)).toBeInTheDocument();
    });
  
    test("open login modal and close it with close button", async () => {
      setGlobalFetch(state.products);
      render(<App />);
      const loginBtn = screen.getByText(/Войти/i);
      userEvent.click(loginBtn);
      await waitFor(() => {
        expect(screen.getByText(/Авторизация/i)).toBeInTheDocument();
      });
      const closeBtn = screen.getByTestId("close-modal-btn");
      userEvent.click(closeBtn);
      expect(screen.queryByText(/Авторизация/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Каталог книг/i)).toBeInTheDocument();
    });

    test("incorrect login data", async () => {
      setGlobalFetch(state.products);
      render(<App />);
      const loginBtn = screen.getByText(/Войти/i);
      userEvent.click(loginBtn);
      const usernameInput = screen.getByLabelText(/Логин/);
      const passwordInput = screen.getByLabelText(/Пароль/);
      const loginForm = screen.getByTestId("login-form");
      expect(usernameInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      userEvent.type(usernameInput, "login");
      userEvent.type(passwordInput, "password");
      setGlobalFetch({ errorStatus: 401 });
      fireEvent.submit(loginForm);
      await waitFor(() => {
        expect(screen.getByText(/Неверный логин или пароль/i)).toBeInTheDocument();
      });
    });

    test("login as user", async () => {
      setGlobalFetch(state.products);
      render(<App />);
      const loginBtn = screen.getByText(/Войти/i);
      userEvent.click(loginBtn);
      const loginForm = screen.getByTestId("login-form");
      const usernameInput = screen.getByLabelText(/Логин/);
      const passwordInput = screen.getByLabelText(/Пароль/);
      userEvent.type(usernameInput, "user");
      userEvent.type(passwordInput, "user");
      setGlobalFetch({ login: "user" });
      fireEvent.submit(loginForm);
      await waitFor(() => {
        expect(screen.queryByText(/Неверный логин или пароль/i)).not.toBeInTheDocument();
      });
      await waitFor(() => {
        expect(loginForm).not.toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.getByText(/Каталог книг/i)).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.getByRole("button", { name: /Выход/i })).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.getByTestId("cart-link")).toBeInTheDocument();
      });
    });
  
    test("login as admin", async () => {
      setGlobalFetch(state.products);
      render(<App />);
      const loginBtn = screen.getByText(/Войти/i);
      userEvent.click(loginBtn);
      const usernameInput = screen.getByLabelText(/Логин/);
      const passwordInput = screen.getByLabelText(/Пароль/);
      const loginForm = screen.getByTestId("login-form");
      userEvent.type(usernameInput, "admin");
      userEvent.type(passwordInput, "admin");
      setGlobalFetch({ login: "admin" });
      fireEvent.submit(loginForm);
      await waitFor(() => {
        expect(screen.queryByText(/Неверный логин или пароль/i)).not.toBeInTheDocument();
      });
      await waitFor(() => {
        expect(loginForm).not.toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.getByText(/Каталог книг/i)).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.getByRole("button", { name: /Выход/i })).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.queryByTestId("cart-link")).not.toBeInTheDocument();
      });
    });
  });
});
