import LoginModalContext from '../contexts/loginModalContext.js';
import useLoginModalValues from '../hooks/useLoginModalValues.js';

const LoginProvider = (props) => {
  const values = useLoginModalValues();
  return (
    <LoginModalContext.Provider value={values}>
      {props.children}
    </LoginModalContext.Provider>
  );
};

export default LoginProvider;
