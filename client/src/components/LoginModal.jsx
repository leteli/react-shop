import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useLoginModalContext from '../hooks/useLoginModalContext.js';
import { checkAuth } from '../api/routes.js';
import cartStyles from '../styles/Cart.module.css';
import styles from '../styles/LoginModal.module.css';

const LoginModal = () => {
  const [authFailed, setAuthFailed] = useState(null);
  const formRef = useRef();
  const { toggleModal, changeLoginStatus, setUser } = useLoginModalContext();
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    const values = new FormData(formRef.current);
    const loginData = {
      login: values.get('login'),
      password: values.get('password'),
    }
    const response = await checkAuth(loginData);
    if (response.errorStatus === 401) {
      setAuthFailed(true);
      return;
    } 
    if (response.login) {
      setAuthFailed(false);
      changeLoginStatus();
      setUser(response.login);
      toggleModal();
      navigate('/');
    }
  };

  return (
    <div className={styles.modalBg}>
      <div className={styles.modal}>
        <header>
          <button className={styles.close} onClick={toggleModal}>
            <img src="/assets/x.svg" alt="Закрыть модальное окно" />
          </button>
          <h1 className={styles.title}>Авторизация</h1>
        </header>
        <form onSubmit={handleAuth} ref={formRef} className={styles.loginForm} action="#">
          <label htmlFor="login">Логин</label>
          <input
            className={authFailed ? styles.invalidInput : styles.input}
            id="login"
            name="login"
            type="text"
            placeholder="Введите логин"
          />
          <label htmlFor="password">Пароль</label>
          <input
            className={authFailed ? styles.invalidInput : styles.input}
            id="password"
            name="password"
            type="password"
            placeholder="Введите пароль"
          />
          {authFailed && <div className={styles.invalid}>Неверный логин или пароль</div>}
          <div className={styles.btnGroup}>
            <button onClick={toggleModal} className={cartStyles.clear}>Отмена</button>
            <button type="submit" className={cartStyles.send}>Войти</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
