import React from "react";
import { Button } from "@mui/material";

export default function CustomButton({ onClick, disabled, label, type = "button" }) {
  return (
    <Button
      variant="contained"
      type= {type} //  props passed
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
        color: "rgb(255, 255, 255)",
        backgroundColor: "rgb(17, 114, 186)",
        textTransform: "none",
        padding: "6px 16px",
        borderRadius: "4px",
        boxShadow: "none",
        "&:hover": {
          backgroundColor: "rgb(13, 90, 146)",
        },
        transition:
          "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Next */}
      {label}
    </Button>
  );
}
