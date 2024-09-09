import * as React from "react";
import AlertModal from "../components/Modals/AlertModal";

const AlertModalContext = React.createContext();

export const useAlertModal = () => React.useContext(AlertModalContext);

export const AlertModalProvider = ({ children }) => {
    const [modalState, setModalState] = React.useState({
        open: false,
        title: "",
        desc: "",
        buttonTitle: "",
        type: "",
        handleConfirm: () => {},
      });
      const showAlertModal = ({ title, desc, buttonTitle, type, handleConfirm }) => {
        setModalState({
          open: true,
          title,
          desc,
          buttonTitle,
          type,
          handleConfirm,
        });
      };
    
      const hideAlertModal = () => {
        setModalState((prevState) => ({ ...prevState, open: false }));
      };
  return (
    <AlertModalContext.Provider value={{ modalState, showAlertModal, hideAlertModal }}>
      {children}
      <AlertModal/>
    </AlertModalContext.Provider>
  );
};
