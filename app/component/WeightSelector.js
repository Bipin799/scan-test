"use client";

import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  FormHelperText,
} from "@mui/material";
import CustomTextField from "./CustomTextField";

const getRulerData = (centerValue, range, step, majorStep, min, max) => {
  
  let start = Math.round(Math.max(min, centerValue - range));
  let end = Math.round(Math.min(max, centerValue + range));
  

  if (start === min && end - start < range * 2) {
    end = Math.min(max, start + range * 2);
  }
  if (end === max && end - start < range * 2) {
     start = Math.max(min, end - range * 2);
  } 

  const ticks = [];
  for (let i = start; i <= end; i += step) {
  const roundedValue = Math.round(i);
  const isMajorTick = roundedValue % majorStep === 0;
  ticks.push({
    value: roundedValue,
    isMajor: isMajorTick,
    label: isMajorTick ? String(roundedValue) : "",
  });
}
  return ticks; 
};


function RulerBar({ value, min, max, step, unit, onValueChange }) {
  const majorStep = 5;
  const visibleRange = 15;
  const currentValue = Math.round(Math.max(min, Math.min(max, value)));
  const currentValue1 =Math.max(min, Math.min(max, value));
  const ticks = getRulerData(currentValue, visibleRange, step, majorStep, min, max);

  const handleRulerClick = (event) => {
    const rulerRect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rulerRect.left;
    const rulerWidth = rulerRect.width;
    const tickWidth = rulerWidth / ticks.length;
    const clickedIndex = Math.floor(clickX / tickWidth);
    
    if (ticks[clickedIndex]) {
      const clickedValue = ticks[clickedIndex].value;
      const clampedValue = Math.max(min, Math.min(max, clickedValue));
      onValueChange(clampedValue);
    }
  };

  const getTickPosition = (tickValue) => {
    const rangeStart = ticks[0]?.value || min;
    const rangeEnd = ticks[ticks.length - 1]?.value || max;
    return ((tickValue - rangeStart) / (rangeEnd - rangeStart)) * 100;
  };

  const centerPosition = getTickPosition(currentValue); 

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: 420,
        position: "relative",
        marginTop: 3,
        padding: "0 16px",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -50,
          left: `${centerPosition}%`,
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            color: "#1172ba",
            padding: "8px 16px",
            fontSize: "1.125rem",
            fontWeight: "600",
            whiteSpace: "nowrap",
          }}
        >
          {currentValue1.toFixed(2)} {unit}
        </Box>
      </Box>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 80,
          cursor: "pointer",
          overflow: "hidden",
        }}
        onClick={handleRulerClick}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          {ticks.map((tick, index) => {
            const isCenter = Math.abs(tick.value - currentValue) < step / 2;            
            const tickPercent = (index / (ticks.length - 1)) * 100; 

            return (
              <Box
                key={`${tick.value}-${index}`}
                sx={{
                  position: "absolute",
                  left: `${tickPercent}%`,
                  transform: "translateX(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  bottom: 0,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    marginBottom: "6px",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                    color: isCenter ? "#1172ba" : "#000",
                    visibility: tick.isMajor ? "visible" : "hidden",
                    minWidth: "20px",
                    textAlign: "center",
                  }}
                >
                  {tick.label}
                </Typography>

                <Box
                  sx={{
                    width: "2px",
                    height: isCenter ? "100px" : tick.isMajor ? "50px" : "20px",
                    backgroundColor: isCenter ? "#1172ba" : "#000",
                    transition: "all 0.2s ease",
                  }}
                />
              </Box>
            );
          })}
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: `${centerPosition}%`,
            transform: "translateX(-50%)",
            backgroundColor: "#1172ba",
            width: "3px",
            height: "100px",
            borderRadius: "1.5px",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 1,
          paddingX: 1,
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.75rem", fontWeight: "500" }}>
          {/* {ticks[0]?.value.toFixed(0) || min} {unit} */}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.75rem", fontWeight: "500" }}>
          {/* {ticks[ticks.length - 1]?.value.toFixed(0) || max} {unit} */}
        </Typography>
      </Box>
    </Box>
  );
}

export default function WeightSelector({ 
  weight, 
  weightUnit, 
  onWeightChange, 
  onUnitChange, 
  error, 
  touched 
}) {  
  const handleUnitChange = (event, newUnit) => {
    if (newUnit !== null) {
      // Only convert if there's a valid weight value
      if (weight && !isNaN(weight)) {
        let convertedWeight;
        if (newUnit === "kg" && weightUnit === "lbs") {
          convertedWeight = Number((weight * 0.453592).toFixed(2));
        } 
        // else if (newUnit === "lbs" && weightUnit === "kg") {
        //   // convertedWeight = Number((weight * 2.20462).toFixed(2));
        // }
         else {
          // If unit hasn't actually changed, keep the same value
          // convertedWeight = weight;
          convertedWeight = Number((weight * 2.20462).toFixed(2));
        }
        
        const syntheticEvent = {
          target: {
            name: "weight",
            value: convertedWeight
          }
        };
        onWeightChange(syntheticEvent, convertedWeight);
      }
      
      onUnitChange(newUnit);
    }
  };

  const handleWeightInputChange = (event) => {
    let value = event.target.value;
    
    // Allow empty string
    if (value === "") {
      onWeightChange(event, "");
      return;
    }
    
    // Remove any non-numeric characters except decimal point
    // This prevents e, +, -, and other characters
    value = value.replace(/[^0-9.]/g, "");
    
    // Prevent multiple decimal points
    const decimalCount = (value.match(/\./g) || []).length;
    if (decimalCount > 1) {
      return;
    }
    
    // Limit to 2 decimal places
    if (value.includes(".")) {
      const parts = value.split(".");
      if (parts[1] && parts[1].length > 2) {
        value = `${parts[0]}.${parts[1].substring(0, 2)}`;
      }
    }
    
    // Convert to number for validation
    const numericValue = parseFloat(value);
    
    // Check if it's a valid positive number
    if (!isNaN(numericValue) && numericValue < 0) {
      return; // Don't allow negative numbers
    }
    
    // Check max limits
    const maxLimit = weightUnit === "lbs" ? 661 : 300;
    if (!isNaN(numericValue) && numericValue > maxLimit) {
      value = maxLimit.toString();
    }

    // Allow partial decimal input (like "54.")
    const syntheticEvent = {
      target: {
        name: "weight",
        value: value
      }
    };
    onWeightChange(syntheticEvent, value);
  };

  const handleRulerChange = (newValue) => {
    const syntheticEvent = {
      target: {
        name: "weight",
        value: newValue
      }
    };
    onWeightChange(syntheticEvent, newValue);
  };

  // Prevent keyboard input of invalid characters
  const handleKeyDown = (event) => {
    // Prevent e, E, +, -, and other non-numeric keys
    if (
      event.key === "e" ||
      event.key === "E" ||
      event.key === "+" ||
      event.key === "-"
    ) {
      event.preventDefault();
    }
  };

  const min = 0;
  const max = weightUnit === "kg" ? 300 : 661;
  const step = 1;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        mt: "15px",
        padding: "0 16px",
      }}
    >
      <ToggleButtonGroup
        value={weightUnit}
        exclusive
        onChange={handleUnitChange}
        sx={{
          display: "inline-flex",
          boxShadow: "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
          borderRadius: "20px",
        }}
      >
        {["kg", "lbs"].map((unit) => (
          <ToggleButton
            key={unit}
            value={unit}
            sx={{
              textTransform: "none",
              fontFamily: 'Roboto, Arial, sans-serif',
              border: "none",
              padding: "10px 30px",
              fontWeight: "500",
              fontSize: "1rem",
              "&.Mui-selected": {
                backgroundColor: "#1976d2",
                color: "#fff",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            {unit}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <CustomTextField
          id="weight"
          name="weight"
          placeholder="0"
          type="text"
          value={weight || ''}
          onChange={handleWeightInputChange}
          onKeyDown={handleKeyDown}
          error={touched && Boolean(error)}
          inputMode="decimal"
          InputProps={{
            endAdornment: (
              <Typography variant="h6" sx={{ ml: 1, fontWeight: "500", color: "text.primary" }}>
                {weightUnit}
              </Typography>
            ),
          }}
          sx={{
            width: "200px",
            "& .MuiOutlinedInput-root": {
              fontWeight: 500,
              fontFamily: "Nunito, sans-serif",
              fontSize: "1.25rem",
              lineHeight: 1.4375,
              color: "rgba(0,0,0,0.87)",
              paddingRight: "14px",
              "& fieldset": {
                borderColor: touched && error ? "#d32f2f" : "#e0e0e0",
                borderWidth: "2px",
              },
              "&:hover fieldset": {
                borderColor: touched && error ? "#d32f2f" : "#1976d2",
              },
              "&.Mui-focused fieldset": {
                borderColor: touched && error ? "#d32f2f" : "#1976d2",
                borderWidth: "2px",
              },
            },
          }}
        />
        {touched && error && (
          <FormHelperText error sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
            {error}
          </FormHelperText>
        )}
      </Box>

      <RulerBar
        value={Number(weight) || 0}
        min={min}
        max={max}
        step={step}
        unit={weightUnit}
        onValueChange={handleRulerChange}
      />
    </Box>
  );
}