

// ProfileForm.jsx
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Container,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Button,
  Typography,
  Avatar,
  InputAdornment,
  FormControlLabel,
  Grid,
  RadioGroup,
  Radio,
  FormHelperText
} from '@mui/material';
import { Formik, Form } from 'formik';
import Layout from '../component/Layout';
import CustomToggles from '../component/CustomToggle';
import CustomStepper from '../component/CustomStepper';
import CustomTextField from '../component/CustomTextField';
import GenderSelector from '../component/GenderSelector';
import BackButton from '../component/BackButton';
import AgeSection from '../component/AgeSection';
import WeightSelector from '../component/WeightSelector';
import HeightSelector from '../component/HeightSelector';
import CustomButton from '../component/CustomButton';
import { debounce } from 'lodash';
import axios from 'axios';
import StepHeader from '../component/StepHeader';
import { validationSchemas, initialValues }  from '../utils/profileValidation';
import CustomCard from '../component/CustomCard';

// Indian Flag Component
const IndianFlag = () => (
  <Box
    component="svg"
    viewBox="0 0 225 150"
    sx={{ width: 30, height: 20, mr: 1, }}
  >
    <rect fill="#FF9933" width="225" height="50" />
    <rect fill="#FFF" y="50" width="225" height="50" />
    <rect fill="#138808" y="100" width="225" height="50" />
    <circle fill="#000080" cx="112.5" cy="75" r="20" />
  </Box>
);

export default function ProfileForm() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['1', '2', '3', '4', '5', '6', '7'];

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleNext = async (validateForm, values, setTouched) => {
    // console.log("handle next is called", validateForm);
    
    // Validate current step
    const errors = await validateForm();
    
    // Get fields for current step
    const stepFields = Object.keys(validationSchemas[activeStep].fields);
    
    // Mark fields as touched
    const touchedFields = {};
    stepFields.forEach(field => {
      touchedFields[field] = true;
    });
    setTouched(touchedFields);
    
    // Check if current step has errors
    const hasStepErrors = stepFields.some(field => errors[field]);
    
    if (!hasStepErrors && activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form submitted successfully with data:", values);
    
    // Optionally: send formData to your backend API
    // fetch("/api/profile", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(values),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("Server Response:", data);
    //     setSubmitting(false);
    //   })
    //   .catch((err) => {
    //     console.error("Error submitting form:", err);
    //     setSubmitting(false);
    //   });
    
    setSubmitting(true);
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

  const debouncedFetchLocation = debounce(
    async (zipCode, setFieldValue, setFieldError) => {
      const location = await fetchLocationDetails(zipCode);

      if (location.valid) {
        setFieldValue("city", location.city);
        setFieldValue("state", location.state);
        setFieldValue("country", location.country);
        setFieldError("zipCode", "");
      } else {
        setFieldValue("city", "");
        setFieldValue("state", "");
        setFieldValue("country", "");
        setFieldError("zipCode", "Invalid ZIP code");
      }
    },
    500
  );

  useEffect(() => {
    return () => {
      debouncedFetchLocation.cancel();
    };
  }, [debouncedFetchLocation]);

  return (
    <Layout>    
        <CustomCard 
        title="Add Patient">
        <Container 
          maxWidth="sm"
          sx={{ py: 3,  mx: "auto",  }}
        >
        <CustomStepper steps={steps} activeStep={activeStep} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas[activeStep]}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ values, errors, touched,setFieldError,setFieldTouched, handleChange, handleBlur, setFieldValue, validateForm, setTouched, isSubmitting, setSubmitting }) => (
            <Form>
              <Box elevation={0}>

                {activeStep === 0 && (
                  <>
                    <StepHeader src="/profile.svg" title="Profile" />
                    <Box sx={{ mb: 3 }}>
                      <TextField
                        fullWidth
                        name="phoneNumber"
                        value={values.phoneNumber}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length > 10) value = value.slice(0, 10);
                          if (value.length > 5) {
                            value = value.slice(0, 5) + '-' + value.slice(5);
                          }

                          setFieldValue('phoneNumber', value);
                        }}
                        onBlur={handleBlur}
                        error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                        helperText={touched.phoneNumber && errors.phoneNumber}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IndianFlag /> +91
                            </InputAdornment>
                          ),
                        }}
                        // placeholder="Please Enter The Number "
                      />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                      <FormControl sx={{ minWidth: 120 }} error={touched.title && Boolean(errors.title)}>
                        <Select
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <MenuItem value="Mr.">Mr.</MenuItem>
                          <MenuItem value="Miss.">Miss.</MenuItem>
                          <MenuItem value="Mrs.">Mrs.</MenuItem>
                          <MenuItem value="Ms.">Ms.</MenuItem>
                          <MenuItem value="Baby">Baby</MenuItem>
                          <MenuItem value="Dr.">Dr.</MenuItem>
                          <MenuItem value="Master">Master</MenuItem>
                        </Select>
                        {touched.title && errors.title && (
                          <FormHelperText>{errors.title}</FormHelperText>
                        )}
                      </FormControl>

                      <TextField
                        fullWidth
                        name="firstName"
                        placeholder="First Name*"
                        value={values.firstName}
                        // onChange={handleChange}
                         onChange={(e) => {
                          // Allow only letters (A–Z, a–z)
                          const value = e.target.value.replace(/[^A-Za-z]/g, '');
                          setFieldValue('firstName', value);
                        }}
                        onBlur={handleBlur}
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                      />
                    </Box>
                    <Box sx={{ mb: 4 }}>
                      <CustomTextField
                        fullWidth
                        name="lastName"
                        placeholder="Last Name*"
                        value={values.lastName}
                        // onChange={handleChange}
                        onChange={(e)=>{
                          const value  = e.target.value.replace(/[^A-Za-z]/g, '');
                          setFieldValue('lastName',value);
                        }}
                        onBlur={handleBlur}
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Box>
                    <CustomToggles values={values} setFieldValue={setFieldValue} />
                  </>
                )}

                {activeStep === 1 && (
                  <>
                    <StepHeader src="/address.svg" title="Address" />
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="caption" sx={{ color: '#333', mb: 0.5, display: 'block', pl: 1 }}>
                        Select Address Type*
                      </Typography>
                      <FormControl fullWidth error={touched.addressType && Boolean(errors.addressType)}>
                        <Select
                          name="addressType"
                          value={values.addressType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <MenuItem value="Register">Register</MenuItem>
                          <MenuItem value="Primary">Primary</MenuItem>
                          <MenuItem value="Secondary">Secondary</MenuItem>
                        </Select>
                        {touched.addressType && errors.addressType && (
                          <FormHelperText>{errors.addressType}</FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                      <Box sx={{ flex: 1 }}>
                        <TextField
                          fullWidth
                          name="zipCode"
                          placeholder="ZipCode*"
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
                                setFieldValue("country", location.country);
                                setFieldError("zipCode", "");
                              } else {
                                setFieldValue("city", "");
                                setFieldValue("state", "");
                                setFieldValue("country", "");
                                setFieldError("zipCode", "Invalid ZIP code");
                                  setFieldTouched("zipCode", true, false);
                              }
                            } else {
                              setFieldValue("city", "");
                              setFieldValue("state", "");
                              setFieldValue("country", "");
                              setFieldError("zipCode", "");
                            }
                          }}
                          error={touched.zipCode && Boolean(errors.zipCode)}
                          helperText={touched.zipCode && errors.zipCode}
                          onBlur={handleBlur}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <TextField
                          fullWidth
                          name="city"
                          placeholder="City*"
                          value={values.city}
                          // onChange={handleChange}
                          // onBlur={handleBlur}
                          // error={touched.city && Boolean(errors.city)}
                          // helperText={touched.city && errors.city}
                          InputProps={{
                            readOnly: true, 
                          }}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                      <Box sx={{ flex: 1 }}>
                        <TextField
                          fullWidth
                          name="state"
                          placeholder="State*"
                          value={values.state}
                          InputProps={{
                            readOnly: true, 
                          }}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <TextField
                          fullWidth
                          name="country"
                          placeholder="Country*"
                          value={values.country}
                          InputProps={{
                            readOnly: true, 
                          }}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                      <TextField
                        fullWidth
                        name="address1"
                        placeholder="Address 1*"
                        value={values.address1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.address1 && Boolean(errors.address1)}
                        helperText={touched.address1 && errors.address1}
                      />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                      <TextField
                        fullWidth
                        name="address2"
                        placeholder="Address 2"
                        value={values.address2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Box>
                  </>
                )}
                
                {activeStep === 2 && (
                  <>
                    <StepHeader src="/gender.svg" title="Gender" />
                    <GenderSelector 
                      value={values.gender}
                      onChange={(gender) => setFieldValue('gender', gender)}
                      isPregnant={values.isPregnant}
                      setFieldValue={setFieldValue}
                      error={touched.gender && errors.gender}
                    />
                  </>
                )}

                {activeStep === 3 && (
                  <>
                  <StepHeader src="/age.svg" title="Age" />
                    <AgeSection 
                      birthdate={values.birthdate}
                      age={values.age}
                      onBirthdateChange={(e) => {
                        const birthdate = e.target.value;
                        const calculatedAge = birthdate ? calculateAge(birthdate) : '';
                        setFieldValue('birthdate', birthdate);
                        setFieldValue('age', calculatedAge);
                      }}
                      onAgeChange={(e) => setFieldValue('age', e.target.value)}
                      errors={errors}
                      touched={touched}
                      //errors={{ birthdate: touched.birthdate && errors.birthdate, age: touched.age && errors.age }}
                    />
                  </>
                )}

                {activeStep === 4 && (
                  <>
                  <StepHeader src="/weight.svg" title=" Weight" />
                    <WeightSelector 
                      weight={values.weight}
                      weightUnit={values.weightUnit}
                      onWeightChange={(e, newValue) => setFieldValue('weight', newValue)}
                      error={errors.weight}
                      touched={touched.weight}
                      onUnitChange={(unit) => {
                        let convertedWeight = values.weight;
                        if (unit === 'lbs' && values.weightUnit === 'kg') {
                          // convertedWeight = Math.round(values.weight * 2.20462);
                           convertedWeight = Number((values.weight * 2.20462).toFixed(2));
                        } else if (unit === 'kg' && values.weightUnit === 'lbs') {
                          // convertedWeight = Math.round(values.weight / 2.20462);
                           convertedWeight = Number((values.weight / 2.20462).toFixed(2));
                        }
                        setFieldValue('weightUnit', unit);
                        setFieldValue('weight', convertedWeight);
                    }}
                    />
                  </>
                )}

                {activeStep === 5 && (
                  <>               
                   <StepHeader src="/height.svg" title=" Height" />
                    <HeightSelector 
                      height={values.height}
                      heightUnit={values.heightUnit}
                      error={errors.height}
                      touched={touched.height}
                      onHeightChange={(e, newValue) => setFieldValue('height', newValue)}
                      onUnitChange={(unit) => {
                        let convertedHeight = values.height;
                        if (unit === 'inch' && values.heightUnit === 'cm') {
                          convertedHeight = Math.round((values.height / 2.54) * 10) / 10;
                        } else if (unit === 'cm' && values.heightUnit === 'inch') {
                          convertedHeight = Math.round(values.height * 2.54 * 10) / 10;
                        }
                        setFieldValue('heightUnit', unit);
                        setFieldValue('height', convertedHeight);
                      }}
                    />
                  </>
                )}

                {activeStep === 6 && (
                  <>
                    <StepHeader src="/bloodGroup.svg" title="Blood Group" />
                    <FormControl fullWidth error={touched.bloodGroup && Boolean(errors.bloodGroup)}>
                      <RadioGroup 
                        name="bloodGroup"
                        value={values.bloodGroup} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <Grid container spacing={1} justifyContent="center">
                          {[['A+', 'A-'], ['B+', 'B-'], ['O+', 'O-'], ['AB+', 'AB-']].map((row, rowIndex) => (
                            <Grid item xs={12} key={rowIndex}>
                              <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 1, sm: 2 }, flexWrap: 'wrap' }}>
                                {row.map((group) => (
                                  <FormControlLabel
                                    key={group}
                                    value={group}
                                    control={<Radio />}
                                    label={group}
                                    sx={{ width: { xs: '120px', sm: '250px' }, backgroundColor: '#f9fcff', justifyContent: 'center' }}
                                  />
                                ))}
                              </Box>
                            </Grid>
                          ))}
                          <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                              <FormControlLabel
                                value="unknown"
                                control={<Radio />}
                                label="I don't know"
                                sx={{ width: { xs: '100%', sm: '528px' }, borderRadius: '20px', backgroundColor: '#f9fcff', justifyContent: 'center' }}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </RadioGroup>
                      {touched.bloodGroup && errors.bloodGroup && (
                        <FormHelperText>{errors.bloodGroup}</FormHelperText>
                      )}
                    </FormControl>
                  </>
                )}

                {/* Navigation Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
                  <BackButton variant="text" onClick={handleBack} disabled={activeStep === 0}>
                    Back
                  </BackButton>



                  {activeStep === steps.length -1 && (
                    <CustomButton type="submit" label="Submit"
                    //  disabled={isSubmitting} 
                     onClick={setSubmitting} 
                     />
                  )}

                   
                  {activeStep !== steps.length - 1 && (
                    <CustomButton
                      type="button"
                      onClick={() => handleNext(validateForm, values, setTouched)}
                      label="Next"
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