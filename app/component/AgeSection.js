// "use client";

// import { useState } from "react";
// import {
//   Box,
//   Grid,
//   Typography,
//   Avatar,
//   TextField,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// // import AgeIcon from "/public/static/images/icons/user-details/age.svg"; // adjust your path
// import Image from "next/image";

// export default function AgeSection() {
//   const [birthDate, setBirthDate] = useState("07/10/2025");
//   const [age, setAge] = useState("");

//   return (
//     <Grid item sm={12} lg={12}>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: 2,
//           mt: 2,
//           mb: 2,
//           fontFamily: "Nunito, sans-serif",
//           fontSize: "1rem",
//           fontWeight: 400,
//         //   border:"2px solid black",
//           lineHeight: 1.5,
//           color: "rgba(0, 0, 0, 0.87)",
//         }}
//       >
//         {/* Header */}
//         {/* <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: 1,
//           }}
//         >
//           <Avatar
//             sx={{
//               width: 48,
//               height: 48,
//               backgroundColor: "transparent",
//             }}
//           >
//             <Image
//               src={AgeIcon}
//               alt="Doctor"
//               width={48}
//               height={48}
//               style={{ objectFit: "contain" }}
//             />
//           </Avatar>
//           <Typography variant="h3" sx={{ fontSize: "1.25rem", fontWeight: 600 }}>
//             Age
//           </Typography>
//         </Box> */}

//         {/* Form Section */}
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//           {/* Birthdate Field */}
//           <Grid
//             container
//             spacing={1}
//             alignItems="center"
//             justifyContent="center"
//             sx={{
//               width: "100%",
//             }}
//           >
//             <Grid item md={3}>
//               <Typography variant="h6" sx={{ fontSize: "1rem" }}>
//                 Birthdate:
//               </Typography>
//             </Grid>

//             <Grid item md={6}>
//               <TextField
//                 fullWidth
//                 placeholder="DD/MM/YYYY"
//                 value={birthDate}
//                 onChange={(e) => setBirthDate(e.target.value)}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton aria-label="Choose date">
//                         <CalendarMonthIcon />
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   backgroundColor: "#fff",
//                   "& .MuiOutlinedInput-root": {
//                     "& fieldset": {
//                       borderColor: "#e0e0e0",
//                     },
//                     "&:hover fieldset": {
//                       borderColor: "#1976d2",
//                     },
//                     "&.Mui-focused fieldset": {
//                       borderColor: "#1976d2",
//                     },
//                   },
//                 }}
//               />
//             </Grid>
//           </Grid>

//           {/* Age Field */}
//           <Grid container spacing={1} alignItems="center" justifyContent="center">
//             <Grid item md={3}>
//               <Typography variant="h6" sx={{ fontSize: "1rem" }}>
//                 Age:
//               </Typography>
//             </Grid>

//             <Grid item md={6}>
//               <Box sx={{ position: "relative" }}>
//                 <TextField
//                   fullWidth
//                   type="number"
//                   value={age}
//                   onChange={(e) => setAge(e.target.value)}
//                   sx={{
//                     backgroundColor: "#fff",
//                     "& .MuiOutlinedInput-root": {
//                       "& fieldset": {
//                         borderColor: "#e0e0e0",
//                       },
//                       "&:hover fieldset": {
//                         borderColor: "#1976d2",
//                       },
//                       "&.Mui-focused fieldset": {
//                         borderColor: "#1976d2",
//                       },
//                     },
//                   }}
//                 />
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     position: "absolute",
//                     right: "12px",
//                     top: "50%",
//                     transform: "translateY(-50%)",
//                     fontSize: "1rem",
//                     color: "rgba(0,0,0,0.6)",
//                   }}
//                 >
//                   Years
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Grid>
//   );
// }

















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

export default function AgeSection() {
  const [birthDate, setBirthDate] = useState(dayjs());
  const [age, setAge] = useState("");
  const [open, setOpen] = useState(false);

  // Calculate age from birthdate
  const calculateAgeFromBirthdate = (date) => {
    if (!date || !date.isValid()) return "";
    
    const today = dayjs();
    const years = today.diff(date, "year");
    return Math.max(0, years).toString(); // Ensure non-negative age
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
      setBirthDate(newValue);
      const calculatedAge = calculateAgeFromBirthdate(newValue);
      setAge(calculatedAge);
    }
  };

  // Handle age input change
  const handleAgeChange = (event) => {
    const newAge = event.target.value;
    setAge(newAge);
    
    if (newAge === "") {
      // If age is cleared, set to current date
      setBirthDate(dayjs());
    } else {
      const calculatedBirthDate = calculateBirthdateFromAge(newAge);
      setBirthDate(calculatedBirthDate);
    }
  };

  // Initialize age on component mount
  useEffect(() => {
    const initialAge = calculateAgeFromBirthdate(birthDate);
    setAge(initialAge);
  }, []);

  return (
    <Grid item sm={12} lg={12}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 2,
          mb: 2,
          fontFamily: "Nunito, sans-serif",
          fontSize: "1rem",
          fontWeight: 400,
          lineHeight: 1.5,
          color: "rgba(0, 0, 0, 0.87)",
        }}
      >
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
                  value={birthDate}
                  onChange={handleDateChange}
                  slots={{
                    textField: (params) => (
                      <TextField
                        {...params}
                        fullWidth
                        placeholder="DD/MM/YYYY"
                        onClick={() => setOpen(true)}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="Choose date"
                                onClick={() => setOpen(true)}
                              >
                                <CalendarMonthIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          backgroundColor: "#fff",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#e0e0e0",
                            },
                            "&:hover fieldset": {
                              borderColor: "#1976d2",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#1976d2",
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
                <TextField
                  fullWidth
                  type="tel"
                  value={age}
                  onChange={handleAgeChange}
                  inputProps={{ 
                    min: 0,
                    max: 150
                  }}
                  sx={{
                    backgroundColor: "#fff",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#e0e0e0",
                      },
                      "&:hover fieldset": {
                        borderColor: "#1976d2",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#1976d2",
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






