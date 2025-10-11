



import React from "react";
import { Grid, TextField } from "@mui/material";

export default function CustomTextField({
  value,
  onChange,
  label,
  name,
  placeholder,
  type = "text",
  maxLength,
  onBlur, 
  error = false ,
  // touched, 
  helperText = "",
  xs = 12,
  lg = 12,
}) {
  return (
    <Grid item xs={xs} lg={lg}
     sx={{
      //  paddingTop: "16px",
      // paddingLeft: "16px"
    }}>
      <TextField
        fullWidth
        id={name}
        name={name}
        label={label}
        placeholder={placeholder}
        type={type}
        value={value}
        onBlur={onBlur} 
        onChange={onChange}
        error={error}
        // touched={touched}

        helperText={helperText}
        variant="outlined"
        inputProps={{ maxLength }}
        sx={{
          fontFamily: "Nunito, sans-serif",
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            boxShadow:
              "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
          },
          "& .MuiOutlinedInput-input": {
            padding: "16.5px 14px",
            font: "inherit",
            letterSpacing: "inherit",
            color: "currentColor",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "20px",
            border: "2px solid rgba(255, 255, 255, 0.2)",
          },
          // "& input:-webkit-autofill": {
          //   WebkitBoxShadow: "0 0 0 1000px #f5f8ff inset",
          //   WebkitTextFillColor: "#000", // text color
          //   transition: "background-color 5000s ease-in-out 0s",
          // },
        }}
      />
    </Grid>
  );
}
