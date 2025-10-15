
"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import CustomTextField from "./CustomTextField";

export default function AgeSection({ birthdate, age, onBirthdateChange, onAgeChange, errors, touched }) {
  const [open, setOpen] = useState(false);

  // Convert birthdate string to dayjs object
  const birthdateValue = birthdate ? dayjs(birthdate) : null;

  // Calculate age from birthdate
  const calculateAgeFromBirthdate = (date) => {
    if (!date || !date.isValid()) return "";
    const today = dayjs();
    const years = today.diff(date, "year");
    return Math.max(0, years).toString();
  };

  // Calculate birthdate from age
  const calculateBirthdateFromAge = (ageValue) => {
    if (!ageValue || ageValue === "") return dayjs();
    const ageNum = parseInt(ageValue);
    if (isNaN(ageNum) || ageNum < 0) return dayjs();
    const today = dayjs();
    return today.subtract(ageNum, "year");
  };

  // Handle birthdate change (from calendar)
  const handleDateChange = (newValue) => {
    if (newValue && newValue.isValid()) {
      const formattedDate = newValue.format("YYYY-MM-DD");
      onBirthdateChange({
        target: { name: "birthdate", value: formattedDate }
      });
      const calculatedAge = calculateAgeFromBirthdate(newValue);
      onAgeChange({
        target: { name: "age", value: calculatedAge }
      });
    }
  };

  //  const handleDateChange = (newValue) => {
  //   if (newValue && newValue.isValid()) {
  //     const calculatedAge = calculateAgeFromBirthdate(newValue);

  //     const validAge = calculatedAge > 125 ? 125 : calculatedAge;

  //     onBirthdateChange({
  //       target: { name: "birthdate", value: newValue.format("YYYY-MM-DD") },
  //     });
  //     onAgeChange({
  //       target: { name: "age", value: validAge.toString() },
  //     });
  //   }
  // };

  // Handle age input change
  // const handleAgeChange = (event) => {
  //   const newAge = event.target.value;
  //   onAgeChange({
  //     target: { name: "age", value: newAge }
  //   });

  //   const calculatedBirthdate = calculateBirthdateFromAge(newAge);
  //   onBirthdateChange({
  //     target: { name: "birthdate", value: calculatedBirthdate.format("YYYY-MM-DD") }
  //   });
  // };

   const handleAgeChange = (event) => {
    let newAge = event.target.value;

    // Prevent typing more than 125
    if (parseInt(newAge) > 125) {
      newAge = "125";
    }

    onAgeChange({
      target: { name: "age", value: newAge },
    });

    const calculatedBirthdate = calculateBirthdateFromAge(newAge);
    onBirthdateChange({
      target: { name: "birthdate", value: calculatedBirthdate.format("YYYY-MM-DD") },
    });
  };

  return (
    <Grid item sm={12} lg={12}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2, mb: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Birthdate Field */}
          <Grid container spacing={1} alignItems="center" justifyContent="center">
            <Grid item md={3}>
              <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                Birthdate:
              </Typography>
            </Grid>

            <Grid item md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  enableAccessibleFieldDOMStructure={false}
                  open={open}
                  onClose={() => setOpen(false)}
                  value={birthdateValue}
                  // value={birthdate ? dayjs(birthdate, ["YYYY-MM-DD", "DD-MM-YYYY"]) : dayjs()}  // if u want today date pre-filled  
                  onChange={handleDateChange}
                  maxDate={dayjs()}
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: "flip",
                          enabled: false, // prevent flipping above
                        },
                        {
                          name: "preventOverflow",
                          enabled: true,
                          options: {
                            altBoundary: true,
                            rootBoundary: "viewport",
                            tether: false,
                          },
                        },
                        {
                          name: "offset",
                          options: {
                            offset: [0, 8], // space between input and calendar
                          },
                        },
                      ],
                      placement: "bottom-start", // always below input
                    },
                  }}
                  slots={{
                    textField: (params) => (
                      <TextField
                        {...params}
                        fullWidth
                        placeholder="DD/MM/YYYY"
                        onClick={() => setOpen(true)}
                        error={touched?.birthdate && Boolean(errors?.birthdate)}
                        helperText={touched?.birthdate && errors?.birthdate}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton aria-label="Choose date" onClick={() => setOpen(true)}>
                                <CalendarMonthIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          backgroundColor: "#fff",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: touched?.birthdate && errors?.birthdate ? "#d32f2f" : "#e0e0e0",
                            },
                            "&:hover fieldset": {
                              borderColor: touched?.birthdate && errors?.birthdate ? "#d32f2f" : "#1976d2",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: touched?.birthdate && errors?.birthdate ? "#d32f2f" : "#1976d2",
                            },
                          },
                        }}
                      />
                    ),
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>

          {/* Age Field */}
          <Grid container spacing={1} alignItems="center" justifyContent="center">
            <Grid item md={3}>
              <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                Age:
              </Typography>
            </Grid>

            <Grid item md={6}>
              <Box sx={{ position: "relative" }}>
                <CustomTextField
                  fullWidth
                  type="number"
                  name="age"
                  value={age}
                  onChange={handleAgeChange}
                  error={touched?.age && Boolean(errors?.age)}
                  helperText={touched?.age && errors?.age}
                  inputProps={{ min: 0, max: 125 }}
                  sx={{
                    backgroundColor: "#fff",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: touched?.age && errors?.age ? "#d32f2f" : "#e0e0e0",
                      },
                      "&:hover fieldset": {
                        borderColor: touched?.age && errors?.age ? "#d32f2f" : "#1976d2",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: touched?.age && errors?.age ? "#d32f2f" : "#1976d2",
                      },
                    },
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "1rem",
                    color: "rgba(0,0,0,0.6)",
                  }}
                >
                  Years
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}
