import React, { ReactElement } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "../store/reducers/rootReducer";
import LoginModalContext from "../contexts/loginModalContext";
import useLoginModal from "../hooks/useLoginModalValues";

import LoginProvider from "../components/LoginProvider";

interface Props {
  children: React.ReactNode;
}
export const store = createStore(rootReducer, applyMiddleware(thunk));

interface IContextData {
  isModalOpen?: boolean,
  isLoggedIn?: boolean,
  currentUser?: string | null,
}

const customRender = (
  ui: ReactElement, context?: IContextData, options?: {}) => {
  const Wrapper = ({ children }: Props) => {
    const values = useLoginModal();
    const newValues = {...values, ...context};
    return (
      <LoginModalContext.Provider value={newValues}>
        <Provider store={store}>
          <MemoryRouter>{children}</MemoryRouter>
        </Provider>
      </LoginModalContext.Provider>
    );
  }; 
  return render(ui, { wrapper: Wrapper, ...options });
};

export * from "@testing-library/react";

export { customRender as render };
