import React from 'react';
import styles from '../styles/Layout.module.css';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
