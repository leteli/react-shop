import { useState } from 'react';
import IContext from '../interfaces/interfaces'

const useLoginModal = (): IContext => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const changeLoginStatus = () => setIsLoggedIn(!isLoggedIn);
  const setUser = (user: string | null) => setCurrentUser(user);

  return {
    isModalOpen, toggleModal,
    isLoggedIn, changeLoginStatus,
    currentUser, setUser,
  };
};

export default useLoginModal;
