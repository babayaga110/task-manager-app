import * as React from "react";
import {
  Button,
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/joy";
import {
  DeleteForever,
  WarningRounded,
  Info,
  Warning,
  Report,
  CheckCircle,
} from "@mui/icons-material";
import { useAlertModal } from "../../useContext/AlertModalContext";

function getIcon(type) {
  switch (type) {
    case "info":
      return <Info />;
    case "warning":
      return <Warning />;
    case "error":
      return <Report />;
    case "success":
      return <CheckCircle />;
    default:
      return null;
  }
}

export default function AlertModal() {
  const { modalState, hideAlertModal } = useAlertModal();

  return (
    <Modal open={modalState.open} onClose={hideAlertModal}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          {getIcon(modalState.type)}
          {modalState.title}
        </DialogTitle>
        <Divider />
        <DialogContent>
          {modalState.desc}
        </DialogContent>
        <DialogActions>
          <Button variant="solid" color="danger" onClick={modalState.handleConfirm}>
            {modalState.buttonTitle}
          </Button>
          <Button
            variant="plain"
            color="neutral"
            loading={modalState.loading}
            onClick={hideAlertModal}
          >
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}
