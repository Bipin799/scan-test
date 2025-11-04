import { useRef } from "react";
import { Box, TextField } from "@mui/material";

const OtpInput = ({ length = 6, onChangeOtp }) => {
  const inputRefs = useRef([]);

  const readOtp = () =>
    inputRefs.current.map((i) => (i ? i.value : "")).join("");

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      e.target.value = value;
      if (index < length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      e.target.value = "";
    }

    if (typeof onChangeOtp === "function") {
      onChangeOtp(readOtp());
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
      {[...Array(length)].map((_, index) => (
        <TextField
          key={index}
          inputRef={(el) => (inputRefs.current[index] = el)}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          inputProps={{
            maxLength: 1,
            style: { textAlign: "center", fontSize: "20px" },
            inputMode: "numeric",
          }}
          sx={{ width: 70 }}
        />
      ))}
    </Box>
  );
};

export default OtpInput;
