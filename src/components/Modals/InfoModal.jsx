import * as React from "react";
import { Divider, Modal, ModalDialog, DialogTitle } from "@mui/joy";
import { useInfoModal } from "../../useContext/InfoModalContext";

export default function InfoModal({ children, title }) {
  const { modalState, hideInfoModal } = useInfoModal();

  return (
    <Modal open={modalState.open} onClose={hideInfoModal}>
      <ModalDialog variant="outlined" role="infodialog" sx={{width:'95%', maxWidth: 400 }}>
        <DialogTitle>{title}</DialogTitle>
        <Divider />
        {children}
      </ModalDialog>
    </Modal>
  );
}
