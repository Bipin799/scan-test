// StepHeader.jsx
import React from "react";
import { Box, Avatar, Typography } from "@mui/material";

const StepHeader = ({ src, title, mb = 2, avatarSize = 100 }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb }}>
      <Avatar
        sx={{
          width: avatarSize,
          height: avatarSize,
          backgroundColor: "rgba(255, 255, 255, 1)",
          mb: 1,
          p: 1.5,
          boxShadow:
            "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
          border: "4px solid #fff",
        }}
        src={src}
      />
      <Typography variant="h5" sx={{ fontWeight: 200, color: "#333", mb }}>
        {title}
      </Typography>
    </Box>
  );
};

export default StepHeader;
