import React from 'react';
import styles from '../styles/Layout.module.css';

interface Props {
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
