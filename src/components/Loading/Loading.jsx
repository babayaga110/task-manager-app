import * as React from "react";
import { Box } from "@mui/joy";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Loading() {
  return (
    <Box 
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "background.paper",
      }}
    >
      <Player
        autoplay={true}
        loop={true}
        controls={false}
        src="/Loading.json"
        style={{ height: "200px", width: "200px" }}
      ></Player>
    </Box>
  );
}
