import React from "react";
import {
  Box,
  Avatar,
  Typography,
  FormControl,
  MenuItem,
  InputAdornment,
  Paper,
  TextField,
  Select
} from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
import styled from "@emotion/styled";

const StyledTextField = styled(TextField)(({ theme }) => ({
  fontFamily: "Nunito, sans-serif",
  fontWeight: 400,
  fontSize: "1rem",
  lineHeight: "1.4375em",
  color: "rgba(0, 0, 0, 0.87)",
  WebkitFontSmoothing: "antialiased",
  WebkitTextSizeAdjust: "100%",
  boxSizing: "border-box",
  cursor: "text",
  display: "inline-flex",
  WebkitBoxAlign: "center",
  alignItems: "center",
  width: "100%",
  position: "relative",
  borderRadius: "4px",

  "& .MuiOutlinedInput-root": {
    borderRadius: "12px", // keeps your custom style
    backgroundColor: "#f5f8ff",
    "& fieldset": {
      borderColor: "#e3ebf6",
      borderWidth: "2px"
    },
    "&:hover fieldset": {
      borderColor: "#1976d2"
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2"
    }
  },
  "& .MuiOutlinedInput-root.Mui-error": {
    "& fieldset": {
      borderColor: "#d32f2f",
      borderWidth: "2px"
    }
  }
}));


const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: '12px',
  backgroundColor: '#f5f8ff',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e3ebf6',
    borderWidth: '2px'
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#1976d2'
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#1976d2'
  }
}));

const IndianFlag = () => (
  <Box
    component="svg"
    viewBox="0 0 225 150"
    sx={{ width: 30, height: 20, mr: 1 }}
  >
    <rect fill="#FF9933" width="225" height="50" />
    <rect fill="#FFF" y="50" width="225" height="50" />
    <rect fill="#138808" y="100" width="225" height="50" />
    <circle fill="#000080" cx="112.5" cy="75" r="20" />
  </Box>
);

export default function ProfileStepOne({
  formData,
  handleTitleChange,
  handleInputChange
}) {
  console.log("the values of ", formData);
  
  return (
    <Box elevation={0}>
      {/* Profile Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4
        }}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            backgroundColor: "#fff",
            mb: 2,
            p:1,
            boxShadow:
              "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
            border: "4px solid #fff"
          }}
          src="/profile.svg" 
        />

        <Typography variant="h5" sx={{ fontWeight: 200, color: "#333" }}>
          Profile
        </Typography>
      </Box>

      {/* Phone Number Field */}
      <Box sx={{ mb: 3 }}>
        {/* <StyledTextField
          fullWidth
          value="+91"
          disabled
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IndianFlag />
              </InputAdornment>
            )
          }}
        /> */}

       {/* <StyledTextField
  fullWidth
  value={formData.phoneNumber || ""}
  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">    
        <IndianFlag />  +91&nbsp;
      </InputAdornment>
    )
  }}
/> */}


      </Box>
      
    </Box>
  );
}
