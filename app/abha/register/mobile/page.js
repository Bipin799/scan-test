
"use client";

import BackButton from "@/app/component/BackButton";
import CustomButton from "@/app/component/CustomButton";
import CustomCard from "@/app/component/CustomCard";
import CustomStepper from "@/app/component/CustomStepper";
import CustomToggles from "@/app/component/CustomToggle";
import Layout from "@/app/component/Layout";
import StepHeader from "@/app/component/StepHeader";
import CustomTextField from "@/app/component/CustomTextField";
import TermsDialog from "@/app/component/TermsDialog";

import {
  Box, Container, Checkbox, Typography, FormControlLabel,
  FormControl, RadioGroup, Radio, TextField, IconButton,
  InputAdornment, List, ListItem, ListItemButton, ListItemText
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import axios from "axios";
import { useState } from "react";
import { Formik, Form } from "formik";

import { 
  initialValues, 
  getStepValidation, 
  generateABHASuggestions 
} from "../../..//utils/abhavalidation";

export default function RegisterMobile() {
  const [activeStep, setActiveStep] = useState(0);
  const [openTermsStep1, setOpenTermsStep1] = useState(false);
  const [openTermsStep2, setOpenTermsStep2] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [abhaSuggestions, setAbhaSuggestions] = useState([]);

  const steps = ["1", "2", "3"];

  const handleNext = async (validateForm, setTouched, values) => {
    const errors = await validateForm();
    const stepValidation = getStepValidation(activeStep);
    const stepFields = Object.keys(stepValidation.fields);
    
    const touchedFields = stepFields.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
    
    setTouched(touchedFields);

    const hasStepErrors = stepFields.some(field => errors[field]);
    
    if (!hasStepErrors) {
      if (activeStep === 1) {
        // Generate ABHA suggestions when moving to step 3
        const suggestions = generateABHASuggestions(
          values.firstName, 
          values.lastName, 
          values.dob
        );
        setAbhaSuggestions(suggestions);
      }
      
      if (activeStep < steps.length - 1) {
        setActiveStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleFormSubmit = (values) => {
    console.log("Final Submit:", values);
  };

  const fetchLocationDetails = async (zipCode) => {
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${zipCode}`);
      const data = response.data;

      if (data && data[0]?.Status === "Success" && data[0]?.PostOffice?.[0]) {
        const { District, State } = data[0].PostOffice[0];
        return { city: District, state: State, country: "India", valid: true };
      } else {
        return { city: "", state: "", country: "", valid: false };
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
      return { city: "", state: "", country: "", valid: false };
    }
  };

  return (
    <Layout>
      <CustomCard title="Register with mobile">
        <Container maxWidth="sm" sx={{ py: 3, mx: "auto" }}>
          <CustomStepper steps={steps} activeStep={activeStep} />

          <Formik
            initialValues={initialValues}
            validationSchema={getStepValidation(activeStep)}
            onSubmit={handleFormSubmit}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({
              values, setFieldValue, setFieldTouched, setFieldError,
              touched, errors, handleBlur, validateForm, setTouched
            }) => (
              <Form>
                <Box>
                  {/* Step 1 */}
                  {activeStep === 0 && (
                    <>
                      <StepHeader
                        src="/profile.svg"
                        title="I Am Community Health Worker / Profile"
                      />

                      <Box sx={{ mb: 2 }}>
                        <CustomToggles
                          values={values}
                          setFieldValue={(field, val) => {
                            setFieldValue(field, val);
                            if (field === "islinked" && val === true) {
                              setFieldValue("mobile", "");
                            }
                          }}
                          fields={["islinked"]}
                        />
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <CustomTextField
                          fullWidth
                          name="mobile"
                          placeholder="Enter Mobile Number*"
                          value={values.mobile}
                          onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length > 10) value = value.slice(0, 10);
                           if (value.length > 5) {
                            value = value.slice(0, 5) + '-' + value.slice(5);
                          }

                          setFieldValue('mobile', value);
                        }}
                          error={touched.mobile && Boolean(errors.mobile)}
                          helperText={touched.mobile && errors.mobile}
                        />
                      </Box>

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.termsAccepted}
                            onChange={(e) => setFieldValue("termsAccepted", e.target.checked)}
                          />
                        }
                        label={
                          <Typography variant="body2">
                            I agree to the{" "}
                            <span
                              onClick={() => setOpenTermsStep1(true)}
                              style={{ color: "#1976d2", cursor: "pointer", textDecoration: "underline" }}
                            >
                              Terms & Conditions
                            </span>
                          </Typography>
                        }
                      />
                      {touched.termsAccepted && errors.termsAccepted && (
                        <Typography variant="caption" color="error" sx={{ display: "block", mt: 0.5 }}>
                          {errors.termsAccepted}
                        </Typography>
                      )}

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
                      <Box sx={{ mb: 2 }}>
                        <CustomTextField 
                          fullWidth 
                          name="firstName" 
                          placeholder="First Name*"
                          value={values.firstName}
                          onChange={(e)=>{
                            const value = e.target.value.replace(/[^A-Za-z]/g, '');
                            setFieldValue('firstName', value);
                          }}
                          error={touched.firstName && Boolean(errors.firstName)}
                          helperText={touched.firstName && errors.firstName}
                        />
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <CustomTextField 
                          fullWidth 
                          name="middleName" 
                          placeholder="Middle Name"
                          value={values.middleName}
                          onChange={(e)=>{
                            const value = e.target.value.replace(/[^A-Za-z]/g, '');
                            setFieldValue('middleName', value);
                          }}
                          error={touched.middleName && Boolean(errors.middleName)}
                          helperText={touched.middleName && errors.middleName}
                        />
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <CustomTextField 
                          fullWidth 
                          name="lastName" 
                          placeholder="Last Name*"
                          value={values.lastName}
                          onChange={(e)=>{
                            const value = e.target.value.replace(/[^A-Za-z]/g, '');
                            setFieldValue('lastName', value);
                          }}
                          error={touched.lastName && Boolean(errors.lastName)}
                          helperText={touched.lastName && errors.lastName}
                        />
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          
                          <DatePicker
                            label="Date of Birth*"
                            value={values.dob || null}
                            onChange={(date) => setFieldValue("dob", date)}
                            maxDate={new Date()}
                            minDate={new Date(1900, 0, 1)}
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                error: touched.dob && Boolean(errors.dob),
                                helperText: touched.dob && errors.dob,
                                onBlur: () => setFieldTouched("dob", true)
                              }
                            }}
                          />
                
                        </LocalizationProvider>
                      </Box>


                      <Box sx={{ mb: 2 }}>
                        <Typography sx={{ mb: 1, fontWeight: 500 }}>Gender*</Typography>
                        <FormControl error={touched.gender && Boolean(errors.gender)}>
                          <RadioGroup
                            row
                            name="gender"
                            value={values.gender}
                            onChange={(e) => setFieldValue("gender", e.target.value)}
                          >
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                          </RadioGroup>
                          {touched.gender && errors.gender && (
                            <Typography variant="caption" color="error">
                              {errors.gender}
                            </Typography>
                          )}
                        </FormControl>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <TextField
                          fullWidth
                          name="zipCode"
                          placeholder="Zip Code*"
                          value={values.zipCode}
                          onChange={async (e) => {
                            let value = e.target.value.replace(/\D/g, "");
                            if (value.length > 6) value = value.slice(0, 6);

                            setFieldValue("zipCode", value);
                            setFieldTouched("zipCode", true);

                            if (value.length === 6) {
                              const location = await fetchLocationDetails(value);

                              if (location.valid) {
                                setFieldValue("city", location.city);
                                setFieldValue("state", location.state);
                                setFieldError("zipCode", "");
                              } else {
                                setFieldValue("city", "");
                                setFieldValue("state", "");
                                setFieldError("zipCode", "Invalid ZIP code");
                              }
                            }
                          }}
                          error={touched.zipCode && Boolean(errors.zipCode)}
                          helperText={touched.zipCode && errors.zipCode}
                          onBlur={handleBlur}
                        />
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <TextField
                          fullWidth
                          name="city"
                          placeholder="City*"
                          value={values.city}
                          InputProps={{ readOnly: true }}
                          error={touched.city && Boolean(errors.city)}
                          helperText={touched.city && errors.city}
                        />
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <TextField
                          fullWidth
                          name="state"
                          placeholder="State*"
                          value={values.state}
                          InputProps={{ readOnly: true }}
                          error={touched.state && Boolean(errors.state)}
                          helperText={touched.state && errors.state}
                        />
                      </Box>

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.termsAccepted2}
                            onChange={(e) => setFieldValue("termsAccepted2", e.target.checked)}
                          />
                        }
                        label={
                          <Typography variant="body2">
                            I agree to the{" "}
                            <span
                              onClick={() => setOpenTermsStep2(true)}
                              style={{ color: "#1976d2", cursor: "pointer", textDecoration: "underline" }}
                            >
                              Personal Information Agreement
                            </span>
                          </Typography>
                        }
                      />

                       {touched.termsAccepted2 && errors.termsAccepted2 && (
                        <Typography variant="caption" color="error" sx={{ display: "block", mt: 0.5 }}>
                          {errors.termsAccepted2}
                        </Typography>
                      )}

                      <TermsDialog 
                        open={openTermsStep2} 
                        onClose={() => setOpenTermsStep2(false)}
                        step={2}
                      />
                    </>
                  )}

                  {/* Step 3 */}
                  {activeStep === 2 && (
                    <>
                      <Box sx={{ mb: 2 }}>
                        <Typography sx={{ mb: 1, fontWeight: 500 }}>
                          Create your ABHA Address*
                        </Typography>
                        <CustomTextField
                          fullWidth
                          name="ABHAaddress"
                          placeholder="Enter ABHA address"
                          value={values.ABHAaddress}
                          onChange={(e)=>{
                            setFieldValue('ABHAaddress', values);
                          }}
                          error={touched.ABHAaddress && Boolean(errors.ABHAaddress)}
                          helperText={touched.ABHAaddress && errors.ABHAaddress}
                        />
                      </Box>

                      {abhaSuggestions.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Typography sx={{ mb: 1, fontWeight: 500, fontSize: "0.9rem" }}>
                            Choose ABHA Address from suggestions:
                          </Typography>
                          <List sx={{ bgcolor: "background.paper", border: "1px solid #e0e0e0", borderRadius: 1 }}>
                            {abhaSuggestions.map((suggestion, index) => (
                              <ListItem key={index} disablePadding>
                                <ListItemButton onClick={() => setFieldValue("ABHAaddress", suggestion)}>
                                  <ListItemText 
                                    primary={suggestion}
                                    secondary={values.ABHAaddress === suggestion ? "Selected" : "Click to use"}
                                  />
                                </ListItemButton>
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )}

                      <Box sx={{ mb: 2 }}>
                        <Typography sx={{ mb: 1, fontWeight: 500 }}>
                          Create your password (optional)
                        </Typography>
                        <TextField
                          fullWidth
                          name="createPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create password"
                          value={values.createPassword}
                          onChange={(e) => setFieldValue("createPassword", e.target.value)}
                          onBlur={handleBlur}
                          error={touched.createPassword && Boolean(errors.createPassword)}
                          helperText={touched.createPassword && errors.createPassword}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  edge="end"
                                >
                                  {showPassword ? <Visibility /> :  <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <TextField
                          fullWidth
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm password"
                          value={values.confirmPassword}
                          onChange={(e) => setFieldValue("confirmPassword", e.target.value)}
                          onBlur={handleBlur}
                          error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                          helperText={touched.confirmPassword && errors.confirmPassword}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  edge="end"
                                >
                                  {showConfirmPassword ?  <Visibility />:  <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      </Box>
                    </>
                  )}

                  {/* Navigation Buttons */}
                  {/* <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 1 }}>
                    <BackButton 
                      variant="text" 
                      onClick={handleBack} 
                      disabled={activeStep === 0}
                    >
                      Back
                    </BackButton>

                    {activeStep === steps.length - 1 ? (
                      <CustomButton type="submit" label="Submit" />
                    ) : (
                      <CustomButton
                        type="button"
                        label="Next"
                        onClick={() => handleNext(validateForm, setTouched, values)}
                      />
                    )}
                  </Box> */}

                  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 1 }}>

                  {/* Hide Back button when activeStep = 1 */}
                  {activeStep !== 0 && (
                    <BackButton 
                      variant="text" 
                      onClick={handleBack} 
                      disabled={activeStep === 0}
                    >
                      Back
                    </BackButton>
                  )}

                  {activeStep === steps.length - 1 && (
                    <CustomButton type="submit" label="Submit"
                    onClick={() => handleNext(validateForm, setTouched, values)}
                    // onClick={setSubmitting} 
                     />
                  )}
                  
                  {activeStep !== steps.length - 1 &&(
                    <CustomButton
                      type="button"
                      label={activeStep === 0 ? "Generate OTP" : "Next"}  
                      onClick={() => handleNext(validateForm, setTouched, values)}
                    />
                  )}

                </Box>

                </Box>
              </Form>
            )}
          </Formik>
        </Container>
      </CustomCard>
    </Layout>
  );
}