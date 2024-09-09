import * as React from "react";
import { DialogContent, DialogActions, Button, Typography } from "@mui/joy";
import { useInfoModal } from "../../useContext/InfoModalContext";
import dayjs from "dayjs";

export default function ViewForm({ task }) {
  const { hideInfoModal } = useInfoModal();
  return (
    <>
      <DialogContent>
        <Typography level="title-md">Title: {
          task?.title
          }</Typography>
        <Typography level="body-md">
          Description: {task?.description}
        </Typography>
        <Typography level="body-sm">
          Created at: {dayjs.unix(task?.createdAt?._seconds).format("MM/DD/YYYY h:mm:ss")}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ flex: "0 !important" }}
          variant="solid"
          color="neutral"
          onClick={hideInfoModal}
        >
          Close
        </Button>
      </DialogActions>
    </>
  );
}
