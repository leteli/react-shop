import React, { useState, useRef, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import useLoginModalContext from "../hooks/useLoginModalContext";
import FormInput from "../components/FormInput";
import { checkAuth } from "../api/routes";
import cartStyles from "../styles/Cart.module.css";
import styles from "../styles/LoginModal.module.css";

const LoginModal: React.FC = () => {
  const [authFailed, setAuthFailed] = useState<boolean | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toggleModal, changeLoginStatus, setUser } = useLoginModalContext();
  const navigate = useNavigate();

  const handleAuth = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!formRef.current) {
      throw new Error("DOM элемент не найден!");
    }
    const values = new FormData(formRef.current);

    const loginData = {
      login: values.get("login") as string,
      password: values.get("password") as string,
    };
    const response = await checkAuth(loginData);
    if (response && response.status === 401) {
      setAuthFailed(true);
      return;
    }
    if (response && response.login) {
      setAuthFailed(false);
      changeLoginStatus();
      setUser(response.login);
      toggleModal();
      navigate("/");
    }
  };

  return (
    <div className={styles.modalBg}>
      <div className={styles.modal}>
        <header>
          <button className={styles.close} onClick={toggleModal} data-testid="close-modal-btn">
            <img src="/assets/x.svg" alt="Закрыть модальное окно" />
          </button>
          <h1 className={styles.title}>Авторизация</h1>
        </header>
        <form
          onSubmit={handleAuth}
          ref={formRef}
          className={styles.loginForm}
          action="#"
          data-testid="login-form"
        >
          <FormInput
            name="login"
            label="Логин"
            type="text"
            placeholder="Введите логин"
            error={authFailed ? "isNotDisplayed" : ""}
          />
          <FormInput
            name="password"
            label="Пароль"
            type="password"
            placeholder="Введите пароль"
            error={authFailed ? "Неверный логин или пароль" : ""}
          />
          <div className={styles.btnGroup}>
            <button
              onClick={toggleModal}
              className={cartStyles.clear}
              data-testid="cancel-login-btn"
            >
              Отмена
            </button>
            <button
              type="submit"
              className={cartStyles.send}
              data-testid="login-btn"
            >
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
