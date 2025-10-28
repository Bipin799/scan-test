// components/Qualifications.js
import React from "react";
import { Box, Typography } from "@mui/material";
import CustomButton from "./CustomButton";

const Qualifications = ({
//   title = "Qualifications", // Dynamic title prop with default
  showQualifications = true,
  title
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        fontFamily: "Nunito, sans-serif",
        color: "rgba(0, 0, 0, 0.87)",
      }}
    >
      {/* Header with Add Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">{title}</Typography> {/* Dynamic title */}
        <CustomButton type="button" label="Add" />
      </Box>

      {/* Content (conditionally rendered) */}
      {showQualifications && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">No qualifications are added.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Qualifications;
