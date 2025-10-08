import React from "react";
import { Button } from "@mui/material";

export default function BackButton({ onClick, disabled }) {
  return (
    <Button
      variant="text"
      onClick={onClick}
      disabled={disabled}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 400,
        fontFamily: "Nunito, sans-serif",
        fontSize: "0.875rem",
        lineHeight: 1.75,
        minWidth: "64px",
        color: disabled ? "rgba(0, 0, 0, 0.26)" : "rgb(17, 114, 186)",
        textTransform: "none",
        padding: "6px 8px",
        borderRadius: "4px",
        boxShadow: "none",
        cursor: disabled ? "default" : "pointer",
        pointerEvents: disabled ? "none" : "auto",
        transition:
          "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      Back
    </Button>
  );
}
