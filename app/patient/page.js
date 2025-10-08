// ProfileForm.jsx
'use client';

import React, { useState } from 'react';
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
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  FormControlLabel,
  Switch,
  Paper,
  Card,
  CardContent,
  Grid,
  Slider,
  ButtonGroup,
  FormLabel,
  RadioGroup,
  Radio
} from '@mui/material';
import Layout from '../component/Layout';
import CustomToggles from '../component/CustomToggle';
import CustomStepper from '../component/CustomStepper';
import ProfileStepOne from '../component/ProfileForm';
import CustomTextField from '../component/CustomTextField';
import GenderSelector from '../component/GenderSelector';
import NextButton from '../component/CustomButton';
import BackButton from '../component/BackButton';
import AgeSection from '../component/AgeSection';
import WeightSelector from '../component/WeightSelector';
import HeightSelector from '../component/HeightSelector';
import CustomButton from '../component/CustomButton';


// Indian Flag Component
const IndianFlag = () => (
  <Box
    component="svg"
    viewBox="0 0 225 150"
    sx={{ width: 30, height: 20, mr: 1 }}
  >
    <rect fill="#FF9933" width="225" height="50" />
    <rect fill="#FFF" y="50" width="225" height="50" />
    <rect fill="#138808" y="100" width="225" height="50" />
    <circle fill="#000080" cx="112.5" cy="75" r="20" />
  </Box>
);

// Main Component
export default function ProfileForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    title: 'Mr.',
    phoneNumber:"",
    firstName: '',
    lastName: '',
    isMarried: false,
    hasDiabetes: false,
    hasHypertension: false,
    addressType: 'Register',
    zipCode: '',
    city: '',
    state: '',
    country: '',
    address1: '',
    address2: '',
    gender: '',
    birthdate: '',
    age: '',
    weightUnit: 'kg',
    weight: 50,
    heightUnit: 'cm',
    height: 2,
    bloodGroup: "",
  });

  const [errors, setErrors] = useState({
    zipCode: false
  });

  const steps = ['1', '2', '3', '4', '5', '6', '7'];

  const validateStep = () => {
    if (activeStep === 1) {
      if (!formData.zipCode) {
        setErrors({ zipCode: true });
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep() && activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setErrors({ zipCode: false });
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      setErrors({ zipCode: false });
    }
  };

  const handleTitleChange = (event) => {
    setFormData({
      ...formData,
      title: event.target.value
    });
  };

  const handleAddressTypeChange = (event) => {
    setFormData({
      ...formData,
      addressType: event.target.value
    });
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
    if (field === 'zipCode' && errors.zipCode) {
      setErrors({ zipCode: false });
    }
  };

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

  const handleBirthdateChange = (event) => {
    const birthdate = event.target.value;
    const calculatedAge = birthdate ? calculateAge(birthdate) : '';
    
    setFormData({
      ...formData,
      birthdate: birthdate,
      age: calculatedAge
    });
  };

  const handleAgeChange = (event) => {
    setFormData({
      ...formData,
      age: event.target.value
    });
  };

  const handleWeightUnitChange = (unit) => {
    let convertedWeight = formData.weight;
    
    if (unit === 'lbs' && formData.weightUnit === 'kg') {
      convertedWeight = Math.round(formData.weight * 2.20462);
    } else if (unit === 'kg' && formData.weightUnit === 'lbs') {
      convertedWeight = Math.round(formData.weight / 2.20462);
    }
    
    setFormData({
      ...formData,
      weightUnit: unit,
      weight: convertedWeight
    });
  };

  const handleWeightChange = (event, newValue) => {
    setFormData({
      ...formData,
      weight: newValue
    });
  };

  const handleHeightUnitChange = (unit) => {
    let convertedHeight = formData.height;
    
    if (unit === 'inch' && formData.heightUnit === 'cm') {
      convertedHeight = Math.round((formData.height / 2.54) * 10) / 10;
    } else if (unit === 'cm' && formData.heightUnit === 'inch') {
      convertedHeight = Math.round(formData.height * 2.54 * 10) / 10;
    }
    
    setFormData({
      ...formData,
      heightUnit: unit,
      height: convertedHeight
    });
  };

  const handleHeightChange = (event, newValue) => {
    setFormData({
      ...formData,
      height: newValue
    });
  };

  const handleChange = (e) => {
    // Allow only numbers
    const value = e.target.value.replace(/\D/g, "");
    setPhone(value);
  };

  const handleBloodGroupChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      bloodGroup: event.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted successfully with data:", formData);

    // Optionally: send formData to your backend API
    // fetch("/api/profile", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log("Server Response:", data))
    //   .catch((err) => console.error("Error submitting form:", err));
  };

  return (
    <Layout>

    <Container maxWidth="sm" 
      sx={{
        py: 6
        }}>

      {/* Stepper */}
      <CustomStepper steps={steps} activeStep={activeStep} />

      <Box elevation={0}>

        {activeStep === 0 && (
          <>
          <ProfileStepOne
            formData={formData}
            handleTitleChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            handleInputChange={(field) => (e) =>
              setFormData({ ...formData, [field]: e.target.value })}
          />

            <Box sx={{ mb: 3 }}>        
              <TextField
                  fullWidth
                  value={formData.phoneNumber || ""}
                  onChange={handleInputChange("phoneNumber")}
                  // onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">    
                        <IndianFlag />  +91&nbsp;
                      </InputAdornment>
                    )
                  }}
                />           
            </Box>

          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={formData.title}
                onChange={handleTitleChange}
                displayEmpty
                variant="outlined"
              >
                <MenuItem value="Mr.">Mr.</MenuItem>
                <MenuItem value="Miss.">Miss.</MenuItem>
                <MenuItem value="Mrs.">Mrs.</MenuItem>
                <MenuItem value="Ms.">Ms.</MenuItem>
                <MenuItem value="Baby">Baby</MenuItem>
                <MenuItem value="Dr.">Dr.</MenuItem>
                <MenuItem value="Master">Master</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              placeholder="First Name*"
              value={formData.firstName}
              onChange={handleInputChange("firstName")}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <CustomTextField
              fullWidth
              value={formData.lastName}
              onChange={handleInputChange("lastName")}
              placeholder="Last Name*"
              variant="outlined"  
            />
          </Box>

          {/* Questions with Switches */}
          <CustomToggles/>

          </>
        )}

        {activeStep === 1 && (
          <>
           <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // mb: 4
              }}
            >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                backgroundColor: "#fff",
                mb: 2,
                p:1,
                boxShadow:
                  "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
                border: "4px solid #fff"
              }}
              src="/address.svg" 
            />

            <Typography variant="h5" sx={{ fontWeight: 200, color: "#333" }}>
              Address
            </Typography>
          </Box>

            <Box sx={{ mb: 3 }}>
              <Typography
                variant="caption"
                sx={{ color: '#fff', mb: 0.5, display: 'block', pl: 1 }}
              >
                Select Address Type*
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.addressType}
                  onChange={handleAddressTypeChange}
                >
                  <MenuItem value="Register">Register</MenuItem>
                  <MenuItem value="Primary">Primary</MenuItem>
                  <MenuItem value="Secondary">Secondary</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Box sx={{ flex: 1 }}>
                <CustomTextField
                  fullWidth
                  placeholder="ZipCode*"
                  value={formData.zipCode}
                  onChange={handleInputChange('zipCode')}
                  error={errors.zipCode}
                  helperText={errors.zipCode ? 'This field is required' : ''}
                  FormHelperTextProps={{
                    sx: { color: '#d32f2f' }
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <CustomTextField
                  fullWidth
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange('city')}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>

              <Box sx={{ flex: 1 }}>
                <CustomTextField
                  fullWidth
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange('state')}
              />
            </Box>
              
            <Box sx={{ flex: 1 }}>
                <CustomTextField
                  fullWidth
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange('country')}
              />
            </Box>
              
              
            </Box>

            <Box sx={{ mb: 3 }}>
              <CustomTextField
                fullWidth
                placeholder="Address 1*"
                value={formData.address1}
                onChange={handleInputChange('address1')}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <CustomTextField
                fullWidth
                placeholder="Address 2"
                value={formData.address2}
                onChange={handleInputChange('address2')}
              />
            </Box>
          </>
        )}

        {activeStep === 2 && (
          <>
            {/* Gender Header */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // mb: 4
              }}
            >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                backgroundColor: "#fff",
                mb: 2,
                p:2,
                boxShadow:
                  "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
                border: "4px solid #fff"
              }}
              src="/gender.svg" 
            />

            <Typography variant="h5" sx={{ fontWeight: 200, color: "#333" }}>
              Gender
            </Typography>
            </Box>

            <GenderSelector/>
          </>
        )}

        {activeStep === 3 && (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // mb: 4
              }}
            >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                backgroundColor: "#fff",
                mb: 2,
                p:1,
                boxShadow:
                  "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
                border: "4px solid #fff"
              }}
              src="/age.svg" 
            />

            <Typography variant="h5" sx={{ fontWeight: 200, color: "#333" }}>
              Age
            </Typography>
          </Box>

            <AgeSection/>

          </>
        )}

        {activeStep === 4 && (
          <>
            {/* Weight Header */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // mb: 4
              }}
            >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                backgroundColor: "#fff",
                mb: 1,
                p:2,
                boxShadow:
                  "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
                border: "4px solid #fff"
              }}
              src="/weight.svg" 
            />

            <Typography variant="h5" sx={{ fontWeight: 200, color: "#333" }}>
              Weight
            </Typography>
            </Box>

            <WeightSelector/>
          </>
        )}

        {activeStep === 5 && (
          <>
            {/* Height Header */}
             <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // mb: 4
              }}
            >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                backgroundColor: "#fff",
                mb: 1,
                p:2,
                boxShadow:
                  "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
                border: "4px solid #fff"
              }}
              src="/height.svg" 
            />

            <Typography variant="h5" sx={{ fontWeight: 200, color: "#333" }}>
              Height
            </Typography>
            </Box>

            <HeightSelector/>

          </>
        )} 

        {activeStep === 6 && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
              px: { xs: 2, sm: 4 },
            }}
          >
            <Avatar
              sx={{
                width: { xs: 80, sm: 100 },
                height: { xs: 80, sm: 100 },
                backgroundColor: "#fff",
                p: 1,
                pl: 1.5,
                boxShadow:
                  "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
                border: "4px solid #fff",
              }}
              src="/bloodGroup.svg"
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 200,
                color: "#333",
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
              }}
            >
              Blood Group
            </Typography>
          </Box>

          <FormControl fullWidth>
            <RadioGroup value={formData.bloodGroup} onChange={handleBloodGroupChange}>
              <Grid container spacing={1} justifyContent="center">
                {[
                  ["A+", "A-"],
                  ["B+", "B-"],
                  ["O+", "O-"],
                  ["AB+", "AB-"],
                ].map((row, rowIndex) => (
                  <Grid item xs={12} key={rowIndex}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: { xs: 1, sm: 2 },
                        flexWrap: "wrap",
                      }}
                    >
                      {row.map((group) => (
                        <FormControlLabel
                          key={group}
                          value={group}
                          control={<Radio />}
                          label={group}
                          sx={{
                            width: { xs: "120px", sm: "250px" },
                            backgroundColor: "#f9fcff",
                            justifyContent: "center",
                          }}
                        />
                      ))}
                    </Box>
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <FormControlLabel
                      value="unknown"
                      control={<Radio />}
                      label="I don't know"
                      sx={{
                        width: { xs: "100%", sm: "528px" },
                        borderRadius: "20px",
                        backgroundColor: "#f9fcff",
                        justifyContent: "center",
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </>
        )} 

        {/* Navigation Buttons */}
        <Box 
        sx={{
           display: 'flex',
          justifyContent: 'flex-end',
          mt: 2, 
          gap: 1,
        }}>
          <BackButton
            variant="text"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </BackButton>

          {activeStep === steps.length - 1 ? (
            <CustomButton
              onClick={handleSubmit}
              label="Submit"
            />
          ) : (
            <CustomButton
              onClick={handleNext}
              label="Next"
            />
          )}
          
        </Box>

      </Box>

    </Container>

    </Layout>
  );
}
