"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Layout from "@/app/component/Layout";
import StepHeader from "@/app/component/StepHeader";
import TermsDialog from "@/app/component/TermsDialog";
import OtpInput from "@/app/component/OtpInput";

import {
  Box,
  Container,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  Card,
  Button,
  FormHelperText,
} from "@mui/material";

// Validation schemas for each step
const validationSchemas = [
  // Step 1: Aadhaar Number
  Yup.object({
    aadhaarNumber: Yup.string()
      .required("AADHAAR number is required")
      .matches(/^\d{4}-\d{4}-\d{4}$/, "AADHAAR must be in format XXXX-XXXX-XXXX")
      .test("valid-aadhaar", "Please enter a valid 12-digit AADHAAR number", (value) => {
        if (!value) return false;
        const digits = value.replace(/-/g, "");
        return digits.length === 12 && /^\d+$/.test(digits);
      }),
    termsAccepted: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required("You must accept the terms and conditions"),
  }),
  // Step 2: OTP
  Yup.object({
    otp: Yup.string()
      .required("OTP is required")
      .matches(/^\d{6}$/, "OTP must be 6 digits")
      .length(6, "OTP must be exactly 6 digits"),
  }),
  // Step 3: ABHA Address
  Yup.object({
    abhaAddress: Yup.string()
      .required("ABHA address is required")
      .min(4, "ABHA address must be at least 4 characters")
      .max(18, "ABHA address must not exceed 18 characters")
      .matches(
        /^[a-zA-Z0-9._]+$/,
        "ABHA address can only contain letters, numbers, dots and underscores"
      )
      .matches(/^[a-zA-Z]/, "ABHA address must start with a letter"),
  }),
];

export default function AadhaarNumber() {
  const [activeStep, setActiveStep] = useState(0);
  const [openTermsStep1, setOpenTermsStep1] = useState(false);

  const steps = Array(3).fill("");

  const formik = useFormik({
    initialValues: {
      aadhaarNumber: "",
      termsAccepted: false,
    //   otp: "",
      abhaAddress: "",
    },
    validationSchema: validationSchemas[activeStep],
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      if (activeStep < steps.length - 1) {
        handleNext();
      } else {
        // Final submission
        console.log("Form submitted:", values);
        alert("Registration completed successfully!");
      }
    },
  });

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
      // Reset validation schema for next step
      formik.setErrors({});
      formik.setTouched({});
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
      formik.setErrors({});
      formik.setTouched({});
    }
  };

  // Format Aadhaar number as user types
  const handleAadhaarChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length > 12) value = value.slice(0, 12);
    
    // Format as XXXX-XXXX-XXXX
    if (value.length > 8) {
      value = `${value.slice(0, 4)}-${value.slice(4, 8)}-${value.slice(8)}`;
    } else if (value.length > 4) {
      value = `${value.slice(0, 4)}-${value.slice(4)}`;
    }
    
    formik.setFieldValue("aadhaarNumber", value);
  };

  return (
    <Layout>
      <Card title="Register with AADHAAR">
        <Container maxWidth="sm" sx={{ py: 3, mx: "auto" }}>
          {/* Stepper */}
          <Stepper activeStep={activeStep}>
            {steps.map((_, index) => (
              <Step key={index}>
                <StepLabel />
              </Step>
            ))}
          </Stepper>

          {/* Step Content */}
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            {/* Step 1 */}
            {activeStep === 0 && (
              <>
                <StepHeader
                  src="/profile.svg"
                  title="I Am Community Health Worker / Profile"
                />

                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ mb: 1, fontWeight: 500 }}>
                    Provide your AADHAAR number to get Registered in ABHA
                  </Typography>

                  <TextField
                    fullWidth
                    name="aadhaarNumber"
                    placeholder="XXXX-XXXX-XXXX"
                    value={formik.values.aadhaarNumber}
                    onChange={handleAadhaarChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.aadhaarNumber &&
                      Boolean(formik.errors.aadhaarNumber)
                    }
                    helperText={
                      formik.touched.aadhaarNumber &&
                      formik.errors.aadhaarNumber
                    }
                    inputProps={{ maxLength: 14 }}
                  />
                </Box>

                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="termsAccepted"
                        checked={formik.values.termsAccepted}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I agree to the{" "}
                        <span
                          onClick={() => setOpenTermsStep1(true)}
                          style={{
                            color: "#1976d2",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          Terms & Conditions
                        </span>
                      </Typography>
                    }
                  />
                  {formik.touched.termsAccepted &&
                    formik.errors.termsAccepted && (
                      <FormHelperText error sx={{ ml: 2 }}>
                        {formik.errors.termsAccepted}
                      </FormHelperText>
                    )}
                </Box>

                <TermsDialog
                  open={openTermsStep1}
                  onClose={() => setOpenTermsStep1(false)}
                  step={1}
                />
              </>
            )}

            {/* Step 2 */}
            {activeStep === 1 && (
              <>
                <StepHeader
                  src="/profile.svg"
                  title="I Am Community Health Worker / Profile"
                />

                <Typography sx={{ mb: 1, fontWeight: 500 }}>
                  OTP sent to Aadhaar Registered mobile number ending with
                  ******2635
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    name="otp"
                    placeholder="Enter 6-digit OTP"
                    value={formik.values.otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 6) {
                        formik.setFieldValue("otp", value);
                      }
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.otp && Boolean(formik.errors.otp)}
                    helperText={formik.touched.otp && formik.errors.otp}
                    inputProps={{ maxLength: 6 }}
                  />
                </Box>

                {/* You can also use your custom OtpInput component here if it supports formik integration */}
              </>
            )}

            {/* Step 3 */}
            {activeStep === 2 && (
              <>
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ mb: 1, fontWeight: 500 }}>
                    Create your ABHA Address*
                  </Typography>

                  <TextField
                    fullWidth
                    name="abhaAddress"
                    placeholder="Enter ABHA address"
                    value={formik.values.abhaAddress}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.abhaAddress &&
                      Boolean(formik.errors.abhaAddress)
                    }
                    helperText={
                      formik.touched.abhaAddress && formik.errors.abhaAddress
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">@sbx</InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Typography
                  sx={{ mb: 1, fontWeight: 500, fontSize: "0.9rem" }}
                >
                  Choose ABHA Address from suggestions:
                </Typography>
              </>
            )}

            {/* Controls */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
                mt: 3,
              }}
            >
              <Button
                variant="text"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                Back
              </Button>

              {activeStep === steps.length - 1 ? (
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              ) : (
                <Button variant="contained" type="submit">
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </Card>
    </Layout>
  );
}