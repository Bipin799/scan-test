import React from "react";
import { Box, Paper, Typography } from "@mui/material";

export default function CustomCard({ title, children, sx = {} }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 6,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100% !important",
        //   maxWidth: "600px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          border: "1px solid #f0f0f0",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 3px",
          overflow: "hidden",
          ...sx,
        }}
      >
        {title && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "16px",
              borderRadius: "8px",
              backgroundColor: "#eee",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                margin: 0,
                fontWeight: 500,
                fontSize: "1rem",
                lineHeight: 1.5,
                fontFamily: "Nunito, sans-serif",
                display: "block",
              }}
            >
              {title}
            </Typography>
          </Box>
        )}

        <Box sx={{ p: 3 }}>{children}</Box>
      </Paper>
    </Box>
  );
}
