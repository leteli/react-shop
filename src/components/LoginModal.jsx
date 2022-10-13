// import { useDispatch } from 'react-redux';
import useLoginModalContext from '../hooks/useLoginModalContext.js';
import cartStyles from '../styles/Cart.module.css';
import styles from '../styles/LoginModal.module.css';

const LoginModal = () => {
  // const dispatch = useDispatch();
  const { setIsModalOpen } = useLoginModalContext();
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.modalBg}>
      <div className={styles.modal}>
        <header>
          <button className={styles.close} onClick={closeModal}>
            <img src="/assets/x.svg" alt="Закрыть модальное окно" />
          </button>
          <h1 className={styles.title}>Авторизация</h1>
        </header>
        <form className={styles.loginForm} action="#">
          <label htmlFor="login">Логин</label>
          <input id="login" name="login" type="text" placeholder="Введите логин" />
          <label htmlFor="password">Пароль</label>
          <input id="password" name="password" type="password" placeholder="Введите пароль" />
          <div className={styles.btnGroup}>
            <button className={cartStyles.clear}onClick={closeModal}>Отмена</button>
            <button className={cartStyles.send}>Войти</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
