import { useContext } from 'react';
import LoginModalContext from '../contexts/loginModalContext';

const useLoginModalContext = () => useContext(LoginModalContext);

export default useLoginModalContext;
