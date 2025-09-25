"use client";

import { CircularProgress, Box } from "@mui/material";

export default function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", 
        width: "100%",
        background: "rgba(255, 255, 255, 0.6)", 
      }}
    >
      <CircularProgress
        size={60}
        thickness={5}
        sx={{
          color: "#2d7231", 
        }}
      />
    </Box>
  );
}