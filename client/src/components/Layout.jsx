import styles from '../styles/Layout.module.css';

const Layout = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
