
import React from "react";
import { Box, Stepper, Step, StepLabel } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function CustomStepper({ steps, activeStep }) {
  return (
    <Box maxWidth="sm" sx={{ mb: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={index < activeStep}>
            <StepLabel
              StepIconComponent={({ completed, active }) => (
                <Box
                  sx={{
                    width: 25,
                    height: 25,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: completed
                      ? "#1976d2"
                      : active
                      ? "#1976d2"
                      : "#ccc",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "11px",
                  }}
                >
                  {completed ? <CheckIcon /> : label}
                </Box>
              )}
              sx={{
                "& .MuiStepLabel-label": {
                  display: "none",
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
