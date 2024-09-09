import * as React from "react";
import { useAlertModal } from "../../useContext/AlertModalContext";
import {
  DialogContent,
  FormControl,
  FormLabel,
  Input,
  DialogActions,
  Button,
  Textarea,
} from "@mui/joy";
import { useInfoModal } from "../../useContext/InfoModalContext";
import { Controller, useForm } from "react-hook-form";
import { useAlert } from "../../useContext/AlertContext";
import taskService from "../../services/taskService";

export default function EditForm({ task }) {
  const { hideInfoModal } = useInfoModal();
  const { showAlert } = useAlert();
  console.log(task);
  const [loading, setLoading] = React.useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await taskService.update({
        ...data,
        id: task?.id || "",
        listId: task?.listId,
      });
      if (res && res.message) {
        showAlert("Success", res.message, "success", "check");
        // Optionally update the state or UI here
      }
    } catch (error) {
      showAlert(
        "Error",
        error.message || "An unexpected error occurred",
        "danger",
        "error"
      );
    }finally {
      hideInfoModal();
      setLoading(false);
    }
  };
  return (
    <>
      <DialogContent component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Controller
            name="title"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <Textarea {...field} minRows={4} />}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="solid" color="neutral" onClick={hideInfoModal}>
          Close
        </Button>
        <Button
          variant="solid"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </DialogActions>
    </>
  );
}
