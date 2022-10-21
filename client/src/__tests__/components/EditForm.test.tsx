import React from "react";
import { screen } from "@testing-library/react";
import { render, store } from "../customRender";
import userEvent from "@testing-library/user-event";
import EditForm from "../../components/EditForm";
import { setGlobalFetch } from "../api/routes.test";
import state, { productData, updatedProduct } from "../stateFixture";
import productsFetched from "../../store/actions/productsActions";


describe('test editing item page', () => {
  test('render edit form', () => {
    store.dispatch(productsFetched(state.products));
    render(<EditForm data={productData} toggleEditForm={() => {}}/>);
    expect(screen.getByLabelText(/Название/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/В наличии/i)).toBeInTheDocument();
    expect(screen.getByTestId("save-edit-btn")).toBeInTheDocument();
  });

  test('edit form with invalid data', () => {
    store.dispatch(productsFetched(state.products))
    render(<EditForm data={productData} toggleEditForm={() => {}}/>);
    const nameInput = screen.getByLabelText(/Название/i);
    const authorInput = screen.getByLabelText(/Автор/i);
    const priceInput = screen.getByLabelText(/Цена/i);
    const inStockInput = screen.getByLabelText(/В наличии/i);
    const descriptionInput = screen.getByLabelText(/Описание/i);
    const saveBtn = screen.getByTestId("save-edit-btn");
    userEvent.type(nameInput, "");
    userEvent.type(authorInput, "a".repeat(100));
    userEvent.type(priceInput, "100");
    userEvent.type(inStockInput, "6");
    userEvent.type(descriptionInput, "Описание".repeat(500));
    userEvent.click(saveBtn);
    expect(screen.getByText(/Поле не должно быть пустым/)).toBeInTheDocument();
    expect(screen.getByText(/Не более 60 символов/)).toBeInTheDocument();
    expect(screen.getByText(/Не более 1000 символов/)).toBeInTheDocument();
  });

  test('edit form with valid data', async () => {
    store.dispatch(productsFetched(state.products))
    render(<EditForm data={productData} toggleEditForm={() => {}}/>);
    const nameInput = screen.getByLabelText(/Название/i);
    const authorInput = screen.getByLabelText(/Автор/i);
    const priceInput = screen.getByLabelText(/Цена/i);
    const inStockInput = screen.getByLabelText(/В наличии/i);
    const descriptionInput = screen.getByLabelText(/Описание/i);
    const saveBtn = screen.getByTestId("save-edit-btn");
    userEvent.type(nameInput, "Название");
    userEvent.type(authorInput, "Автор");
    userEvent.type(priceInput, "100");
    userEvent.type(inStockInput, "6");
    userEvent.type(descriptionInput, "Описание");
    setGlobalFetch(updatedProduct);
    userEvent.click(saveBtn);
    expect(screen.queryByText(/Поле не должно быть пустым/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Не более 60 символов/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Не более 1000 символов/)).not.toBeInTheDocument();
  });
});
