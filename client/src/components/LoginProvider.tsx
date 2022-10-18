import React from 'react';
import LoginModalContext from '../contexts/loginModalContext';
import useLoginModalValues from '../hooks/useLoginModalValues';

interface Props {
  children: React.ReactNode;
};

const LoginProvider: React.FC<Props> = (props) => {
  const values = useLoginModalValues();
  return (
    <LoginModalContext.Provider value={values}>
      {props.children}
    </LoginModalContext.Provider>
  );
};

export default LoginProvider;
