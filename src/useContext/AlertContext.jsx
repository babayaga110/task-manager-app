// AlertContext.js
import React, { createContext, useState, useContext } from 'react';
import AlertComponent from '../components/Notifcation/AlertComponent';

const AlertContext = createContext();
 
export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ visible: false, title: '', desc: '', color: '', type: '' });

  const showAlert = (title, desc, color = 'primary', type = 'info') => {
    setAlert({ visible: true, title, desc, color, type });
  };

  const hideAlert = () => {
    setAlert({ ...alert, visible: false });
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      hideAlert();
    }, 5000);
    return () => clearTimeout(timer);
  }, [alert.visible]);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alert.visible && <AlertComponent {...alert} hideAlert={hideAlert} />}
    </AlertContext.Provider>
  );
};
