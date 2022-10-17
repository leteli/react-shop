import { useState } from 'react';

const useLoginModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const changeLoginStatus = () => setIsLoggedIn(!isLoggedIn);
  const setUser = (user) => setCurrentUser(user);

  return {
    isModalOpen, toggleModal,
    isLoggedIn, changeLoginStatus,
    currentUser, setUser,
  };
};

export default useLoginModal;
