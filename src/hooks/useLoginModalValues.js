import { useState } from 'react';

const useLoginModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return {
    isModalOpen, setIsModalOpen,
    isLoggedIn, setIsLoggedIn,
    currentUser, setCurrentUser,
  };
};

export default useLoginModal;
