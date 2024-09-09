import React, { createContext, useContext, useState } from 'react';

// Define the context
const InfoModalContext = createContext();

// Create a Provider Component
const InfoModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({ open: false });

    const hideInfoModal = () => {
    setModalState((prevState) => ({ ...prevState, open: false }));
    }
    const showInfoModal = () => {
    setModalState((prevState) => ({ ...prevState, open: true }));
    }

  return (
    <InfoModalContext.Provider value={{ 
        modalState,
        hideInfoModal,
        showInfoModal
     }}>
      {children}
    </InfoModalContext.Provider>
  );
};

// Custom hook to use the Drawer context
const useInfoModal = () => useContext(InfoModalContext);

export { InfoModalProvider, useInfoModal };