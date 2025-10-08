// import React from "react";
// import { TextField } from "@mui/material";
// import { styled } from "@mui/material/styles";

// const StyledTextField = styled(TextField)(({ theme }) => ({
//   fontFamily: "Nunito, sans-serif",
//   fontWeight: 400,
//   fontSize: "1rem",
//   lineHeight: "1.4375em",
//   color: "rgba(0, 0, 0, 0.87)",
//   WebkitFontSmoothing: "antialiased",
//   WebkitTextSizeAdjust: "100%",
//   boxSizing: "border-box",
//   cursor: "text",
//   display: "inline-flex",
//   WebkitBoxAlign: "center",
//   alignItems: "center",
//   width: "100%",
//   position: "relative",
//   borderRadius: "25px",
//   boxShadow: "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset !important",
 
//   "& .MuiOutlinedInput-root": {
//     borderRadius: "12px",
//     backgroundColor: "#f5f8ff",
//     "& fieldset": {
//       borderColor: "#e3ebf6",
//       borderWidth: "2px",
//       boxShadow: "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset !important",
 
//     },
//     "&:hover fieldset": {
//       borderColor: "#1976d2",
//        boxShadow: "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset !important",
 
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#1976d2",
//       boxShadow: "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset !important",
 
//     }
//   },
//   "& .MuiOutlinedInput-root.Mui-error": {
//     "& fieldset": {
//       borderColor: "#d32f2f",
//       borderWidth: "2px"
//     }
//   }
// }));

// export default function CustomTextField({
//   value,
//   onChange,
//   placeholder,
//   type = "text",
//   disabled = false,
//   startAdornment,
//   multiline = false,
//   rows,
//   maxLength,
//   fullWidth = true,
//   name,
// }) {
//   return (
//     <StyledTextField
//       fullWidth={fullWidth}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       type={type}
//       disabled={disabled}
//       multiline={multiline}
//       rows={rows}
//       inputProps={{ maxLength }}
//       InputProps={{
//         startAdornment: startAdornment
//       }}
//       name={name}
//     />
//   );
// }







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
  error = false,
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
        onChange={onChange}
        error={error}
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
