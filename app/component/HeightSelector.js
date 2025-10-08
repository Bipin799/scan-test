"use client";

import { useState } from "react";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  TextField,
} from "@mui/material";

export default function HeightSelector() {
  const [unit, setUnit] = useState("cm");
  const [weight, setWeight] = useState("");

  const handleUnitChange = (event, newUnit) => {
    if (newUnit !== null) setUnit(newUnit);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const rulerMarks = Array.from({ length: 16 }, (_, i) => i); // 0 to 15

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        mt: "15px",
      }}
    >
      {/* Unit Selector */}
            <ToggleButtonGroup
        value={unit}
        exclusive
        onChange={handleUnitChange}
        sx={{
          display: "inline-flex",
          boxShadow:
            "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
          borderRadius: "20px",
        }}
      >
        <ToggleButton
          value="cm"
          sx={{
            textTransform: "none",
            border: "none",
            padding: "10px 30px",
            fontWeight: "bold",
            "&.Mui-selected": {
              backgroundColor: "#1976d2",
              color: "#fff",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          cm
        </ToggleButton>

        <ToggleButton
          value="Inch"
          sx={{
            textTransform: "none",
            border: "none",
            padding: "10px 30px",
            fontWeight: "bold",
            "&.Mui-selected": {
              backgroundColor: "#1976d2",
              color: "#fff",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          Inch
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Weight Input */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <TextField
          id="weight"
          name="weight"
          placeholder="0"
          type="tel"
          value={weight}
          onChange={handleWeightChange}
          InputProps={{
            endAdornment: (
              <Typography variant="h6" sx={{ ml: 1 }}>
                {unit}
              </Typography>
            ),
          }}
          sx={{
            width: "250px",
            "& .MuiOutlinedInput-root": {
              fontWeight: 400,
              fontFamily: "Nunito, sans-serif",
              fontSize: "1rem",
              lineHeight: 1.4375,
              color: "rgba(0,0,0,0.87)",
              paddingRight: "14px",
            },
          }}
        />

        {/* Ruler Marks */}
        {/* <Box sx={{ display: "flex", gap: "5px" }}>
          {rulerMarks.map((mark, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  visibility:
                    mark % 5 === 0 ? "visible" : "hidden",
                  marginBottom: "5px",
                  width: "12px",
                  fontSize: "0.8rem",
                }}
              >
                {mark}.00
              </Typography>
              <Box
                sx={{
                  width: "4px",
                  height: "20px",
                  backgroundColor:
                    mark % 5 === 0 ? "rgb(17, 114, 186)" : "black",
                }}
              />
            </Box>
          ))}
        </Box> */}

      </Box>
    </Box>
  );
}