import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../customRender";
import ItemCard from "../../components/ItemCard";
import { productData } from "../stateFixture";


describe('test item card', () => {
  test('rendering item card', async () => {
    render(<ItemCard data={productData}/>);
      await expect(screen.getByText(productData.name)).toBeInTheDocument();
      await expect(screen.getByText(productData.author)).toBeInTheDocument();
      await expect(screen.getByText(`${productData.price} ₽`)).toBeInTheDocument();
      await expect(screen.getByAltText(/Обложка книги/)).toBeInTheDocument();
      await expect(screen.getByText(/Войдите, чтобы добавить/i)).toBeInTheDocument();
  });
});
