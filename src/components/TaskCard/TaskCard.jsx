import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardOverflow,
  IconButton,
} from "@mui/joy";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import dayjs from "dayjs";

export default function TaskCard({
  task,
  handleDelete,
  handleUpdate,
  handleView,
}) {

  return (
    <Card
      sx={{
        boxShadow: "none",
        border: 0,
        borderRadius: 0,
        backgroundColor: "transparent",
      }}
    >
      <CardContent>
        <Typography level="title-lg">{task?.title}</Typography>
        <Typography level="body-md" gutterBottom>
          {task?.description}
        </Typography>
        <Typography level="body-xs" marginTop={3}>
          Created At: {dayjs.unix(task?.createdAt?._seconds).format("MM/DD/YYYY h:mm:ss")}
          
        </Typography>
      </CardContent>
      <CardOverflow
        sx={{
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
          justifyContent: "flex-end",
          p: 1,
        }}
      >
        <IconButton
          variant="solid"
          color="danger"
          size="sm"
          onClick={handleDelete}
        >
          <Delete />
        </IconButton>
        <IconButton variant="solid" color="primary" size="sm" onClick={()=>handleUpdate(task)}>
          <Edit />
        </IconButton>
        <IconButton variant="solid" color="neutral" size="sm" onClick={()=>handleView(task)}>
          <Visibility />
        </IconButton>
      </CardOverflow>
    </Card>
  );
}
