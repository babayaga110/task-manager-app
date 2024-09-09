import * as React from "react";
import { LinearProgress, Box, IconButton, Typography, Alert } from "@mui/joy";
import { Info, Warning, Report, CheckCircle, CloseRounded } from "@mui/icons-material";

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

export default function AlertComponent({
  title,
  desc,
  color,
  type,
  hideAlert,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        width: "calc(100% - 20px)",
        maxWidth: 400,
        flexDirection: "column",
        position: "fixed",
        bottom: 10,
        right: 10,
        zIndex: 9999,
      }}
    >
      <Alert
        key={title}
        sx={{ alignItems: "flex-start" }}
        startDecorator={getIcon(type)}
        variant="soft"
        color={color}
        endDecorator={
          <IconButton variant="soft" color={color} onClick={hideAlert}>
            <CloseRounded />
          </IconButton>
        }
      >
        <div>
          <div>{title}</div>
          <Typography level="body-sm" color={color}>
            {desc}
          </Typography>
        </div>
        <LinearProgress
          variant="solid"
          color={color}
          value={40}
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
          }}
        />
      </Alert>
    </Box>
  );
}
