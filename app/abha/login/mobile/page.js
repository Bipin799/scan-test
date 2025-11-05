"use client"

import CustomCard from "@/app/component/CustomCard";
import Layout from "@/app/component/Layout";
import { Box, Button, Container, FormControlLabel, Radio, RadioGroup, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

export default function LoginMobile(){
    const [activeStep, setActiveStep] = useState(0);

    const steps = Array(2).fill("");

    // Validation schemas for each step
    const validationSchemas = [
      // Step 0: Mobile number validation
      Yup.object({
        mobile: Yup.string()
          .required("Mobile number is required")
          .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
          .test('no-spaces', 'Mobile number cannot contain spaces', (value) => {
            return value ? !/\s/.test(value) : true;
          }),
      }),
      // Step 1: ABHA address validation
      Yup.object({
        abhaAddress: Yup.string()
          .required("Please select an ABHA address to continue"),
      }),
    ];

      const formik = useFormik({
        initialValues: {
            mobile: "",
            abhaAddress:""
        },
        validationSchema: validationSchemas[activeStep],
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
          // Validate current step before proceeding
          const currentSchema = validationSchemas[activeStep];
          try {
            await currentSchema.validate(values, { abortEarly: false });
            
            if (activeStep < steps.length - 1) {
              handleNext();
            } else {
              // Final submission
              console.log("Form submitted:", values);
              alert("Registration completed successfully!");
            }
          } catch (error) {
            // Validation errors will be handled by Formik
            console.log("Validation failed:", error);
          }
        },
      });

      const handleNext = () => {
        if (activeStep < steps.length - 1) {
          setActiveStep((prev) => prev + 1);
          // Reset touched fields for next step
          formik.setTouched({});
        }
      };

    
      const handleBack = () => {
        if (activeStep > 0) {
          setActiveStep((prev) => prev - 1);
          formik.setTouched({});
        }
      };

      const abhaAddressList = [
        "john@sbx",
        "john123@sbx",
        "john.abha@sbx"
      ];

    return(
        <Layout>
            <CustomCard title="Login With Mobile Number">
                <Container maxWidth="sm" sx={{ py: 3, mx: "auto" }}>
                     <Stepper activeStep={activeStep}>
                        {steps.map((_, index) => (
                        <Step key={index}>
                            <StepLabel />
                        </Step>
                        ))}
                    </Stepper>
                        
                        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 , mb: 2}}>
                            {activeStep === 0 && (
                                <>
                                <Box sx={{mb:2}}>
                                     <Typography 
                                        sx={{ 
                                        fontWeight: 600, 
                                        fontSize: "15px",
                                        pl:1,
                                        color: "text.secondary",
                                        letterSpacing: "0.3px"
                                        }}
                                    >
                                        Mobile Number <span style={{ color: "red" }}>*</span>
                                    </Typography>
                                        
                                    <TextField
                                    fullWidth
                                    name="mobile"
                                    placeholder="0000000000"
                                    value={formik.values.mobile}
                                    onChange={(e)=>{
                                        // Only allow numbers and limit to 10 digits
                                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        formik.setFieldValue("mobile", value);
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                    helperText={formik.touched.mobile && formik.errors.mobile}
                                    inputProps={{ maxLength: 10 }}
                                    />
                                </Box>
                                    
                                </>
                            )}

                             {activeStep === 1 && (
                                <>
                                   <Box sx={{ mb: 2 }}>
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
                                            Choose the ABHA address you want to log in with <span style={{ color: "red" }}>*</span>
                                        </Typography>

                                        <RadioGroup
                                            name="abhaAddress"
                                            value={formik.values.abhaAddress}
                                            onChange={(e) => {
                                              formik.setFieldValue("abhaAddress", e.target.value);
                                            // formik.setFieldTouched("abhaAddress", true);
                                            }}
                                        >
                                            {abhaAddressList?.map((item, index) => (
                                            <FormControlLabel
                                                key={index}
                                                value={item}
                                                control={<Radio />}
                                                label={item}
                                                sx={{ ml: 1 }}
                                            />
                                            ))}
                                        </RadioGroup>
                                        
                                        {formik.touched.abhaAddress && formik.errors.abhaAddress && (
                                          <Typography 
                                            sx={{ 
                                              color: "error.main", 
                                              fontSize: "0.75rem",
                                              mt: 1,
                                              ml: 2
                                            }}
                                          >
                                            {formik.errors.abhaAddress}
                                          </Typography>
                                        )}
                                        </Box>

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
            </CustomCard>

        </Layout>
    );
}