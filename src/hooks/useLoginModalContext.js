import { useContext } from 'react';
import LoginModalContext from '../contexts/loginModalContext.js';

const useLoginModalContext = () => useContext(LoginModalContext);

export default useLoginModalContext;
