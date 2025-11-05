"use client";

import CustomCard from "@/app/component/CustomCard";
import Layout from "@/app/component/Layout";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Container, TextField, Box, Typography, InputAdornment, IconButton, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

export default function AbhaAddress() {
    const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      abhaAddress:"",
      loginType: "password",
      password:"",
      aadhaarOtp: "",
      mobileOtp: "",
      otpMethod: "", 
    },
    validationSchema: Yup.object({
      abhaAddress: Yup.string().required("ABHA Address is required"),
      loginType: Yup.string().required(),

      password: Yup.string().when("loginType", {
        is: "password",
        then: (schema) => schema
          .required("Password is required")
          .min(6, "Password must be at least 6 characters"),
        otherwise: (schema) => schema.nullable(),
      }),

      otpMethod: Yup.string().when("loginType", {
        is: "otp",
        then: (schema) => schema.required("Please select an OTP method"),
        otherwise: (schema) => schema.nullable(),
      }),

      aadhaarOtp: Yup.string().when(["loginType", "otpMethod"], {
        is: (loginType, otpMethod) => loginType === "otp" && otpMethod === "aadhaar",
        then: (schema) => schema
          .required("Aadhaar OTP is required")
          .matches(/^\d{6}$/, "OTP must be 6 digits"),
        otherwise: (schema) => schema.nullable(),
      }),

      mobileOtp: Yup.string().when(["loginType", "otpMethod"], {
        is: (loginType, otpMethod) => loginType === "otp" && otpMethod === "mobile",
        then: (schema) => schema
          .required("Mobile OTP is required")
          .matches(/^\d{6}$/, "OTP must be 6 digits"),
        otherwise: (schema) => schema.nullable(),
      }),
    }),
    onSubmit: async (values) => {
      console.log("Form submitted:", values);
      alert("Login completed successfully!");
    },
  });

  return (
    <Layout>
      <CustomCard title="Login With ABHA Address">
        <Container maxWidth="sm" sx={{ py: 3, mx: "auto" }}>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2, mb: 2 }}>

            <Box sx={{ mb: 2 }}>
              <Typography 
                sx={{ 
                  fontWeight: 600, 
                  fontSize: "15px",
                  pl: 1,
                  color: "text.secondary",
                  letterSpacing: "0.3px"
                }}
              >
                ABHA Address
              </Typography>

              <TextField
                fullWidth
                name="abhaAddress"
                placeholder="Enter ABHA Address"
                value={formik.values.abhaAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.abhaAddress && Boolean(formik.errors.abhaAddress)}
                helperText={formik.touched.abhaAddress && formik.errors.abhaAddress}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">@sbx</InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography 
                sx={{ 
                  fontWeight: 600, 
                  fontSize: "15px",
                  pl: 1,
                  color: "text.secondary",
                  letterSpacing: "0.3px"
                }}
              >
                Login using below method
              </Typography>

              <RadioGroup
                row
                name="loginType"
                value={formik.values.loginType}
                onChange={(e) => {
                  const value = e.target.value;
                  formik.setFieldValue("loginType", value);

                  // Reset fields when switching login method
                  if (value === "password") {               
                    formik.setFieldValue("password", "");
                    formik.setFieldValue("otpMethod", "");
                    formik.setFieldValue("aadhaarOtp", "");
                    formik.setFieldValue("mobileOtp", "");
                  } else {
                    formik.setFieldValue("password", "");
                    formik.setFieldValue("otpMethod", "");
                    formik.setFieldValue("aadhaarOtp", "");
                    formik.setFieldValue("mobileOtp", "");
                  }
                }}
                sx={{ pl: 1, mt: 1 }}
              >
                <FormControlLabel value="password" control={<Radio />} label="Password" />
                <FormControlLabel value="otp" control={<Radio />} label="OTP" />
              </RadioGroup>
            </Box>

            {formik.values.loginType === "password" && (
              <Box sx={{ mb: 2 }}>
                <Typography 
                  sx={{ 
                    fontWeight: 600, 
                    fontSize: "15px",
                    pl: 1,
                    color: "text.secondary",
                    letterSpacing: "0.3px"
                  }}
                >
                  Password
                </Typography>

                <TextField
                  fullWidth
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            )}

            {formik.values.loginType === "otp" && (
              <Box sx={{ mt: 2 }}>
                <Typography 
                  sx={{ 
                    fontWeight: 600, 
                    fontSize: "15px",
                    pl: 1,
                    color: "text.secondary",
                    letterSpacing: "0.3px",
                    mb: 1
                  }}
                >
                  Validate using
                </Typography>

                <Box 
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 2
                  }}
                >
                  <Box
                    onClick={() => formik.setFieldValue("otpMethod", "aadhaar")}
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: "10px",
                      p: 2,
                      textAlign: "center",
                      cursor: "pointer",
                      bgcolor: formik.values.otpMethod === "aadhaar" ? "#e8f5e9" : "white",
                      transition: "0.2s",
                      "&:hover": { borderColor: "#1976d2" }
                    }}
                  >
                    <img src="/aadhaarIcon.png" alt="Aadhaar" width="60" height="60" />
                    <Typography sx={{ mt: 1, fontWeight: 600 }}>Aadhaar OTP</Typography>
                  </Box>

                  <Box
                    onClick={() => formik.setFieldValue("otpMethod", "mobile")}
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: "10px",
                      p: 2,
                      textAlign: "center",
                      cursor: "pointer",
                      bgcolor: formik.values.otpMethod === "mobile" ? "#e8f5e9" : "white",
                      transition: "0.2s",
                      "&:hover": { borderColor: "#1976d2" }
                    }}
                  >
                    <img src="/mobileIcon.png" alt="Mobile" width="60" height="60" />
                    <Typography sx={{ mt: 1, fontWeight: 600 }}>Mobile OTP</Typography>
                  </Box>
                </Box>

                {formik.touched.otpMethod && formik.errors.otpMethod && (
                  <Typography color="error" sx={{ mt: 1, fontSize: "0.75rem", pl: 1 }}>
                    {formik.errors.otpMethod}
                  </Typography>
                )}

                {formik.values.otpMethod === "aadhaar" && (
                  <Box sx={{ mt: 2 }}>
                    <Typography 
                      sx={{ 
                        fontWeight: 600, 
                        fontSize: "15px",
                        pl: 1,
                        color: "text.secondary",
                        letterSpacing: "0.3px"
                      }}
                    >
                      Aadhaar OTP
                    </Typography>
                    <TextField
                      fullWidth
                      name="aadhaarOtp"
                      placeholder="Enter 6-digit OTP"
                      value={formik.values.aadhaarOtp}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.aadhaarOtp && Boolean(formik.errors.aadhaarOtp)}
                      helperText={formik.touched.aadhaarOtp && formik.errors.aadhaarOtp}
                      inputProps={{ maxLength: 6 }}
                    />
                  </Box>
                )}

                {formik.values.otpMethod === "mobile" && (
                  <Box sx={{ mt: 2 }}>
                    <Typography 
                      sx={{ 
                        fontWeight: 600, 
                        fontSize: "15px",
                        pl: 1,
                        color: "text.secondary",
                        letterSpacing: "0.3px"
                      }}
                    >
                      Mobile OTP
                    </Typography>
                    <TextField
                      fullWidth
                      name="mobileOtp"
                      placeholder="Enter 6-digit OTP"
                      value={formik.values.mobileOtp}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.mobileOtp && Boolean(formik.errors.mobileOtp)}
                      helperText={formik.touched.mobileOtp && formik.errors.mobileOtp}
                      inputProps={{ maxLength: 6 }}
                    />
                  </Box>
                )}
              </Box>
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button variant="contained" type="submit">Submit</Button>
            </Box>

          </Box>
        </Container>
      </CustomCard>
    </Layout>
  );
}