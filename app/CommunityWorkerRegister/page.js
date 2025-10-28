'use client';

import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import CustomCard from "../component/CustomCard";
import CustomStepper from "../component/CustomStepper";
import BackButton from "../component/BackButton";
import CustomButton from "../component/CustomButton";
import { Form, Formik } from "formik";
import { Container, Box, FormControl, Select, MenuItem, TextField, Typography, Switch, FormHelperText, InputAdornment, IconButton } from "@mui/material";
import { communityWorkerValidationSchemas, communityWorkerInitialValues } from '../utils/profileValidation';
import StepHeader from "../component/StepHeader";
import GenderSelector from "../component/GenderSelector";
import AgeSection from "../component/AgeSection";
import { debounce } from 'lodash';
import axios from "axios";
import CustomTextField from "../component/CustomTextField";
import AddOrganizationModal from "../component/AddOrganizationModal";
import AddQualificationModal from "../component/AddQualificationModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CommunityWorkerRegister() {
    // State declarations
    const [activeStep, setActiveStep] = useState(0);
    const [openQualificationModal, setOpenQualificationModal] = useState(false);
    const [editQualificationData, setEditQualificationData] = useState(null);

    const [openOrganizationNameModal, setOpenOrganizationNameModal] = useState(false);
    const [editOrganizationData, setEditOrganizationData] = useState(null);
    const steps = ['1', '2', '3', '4'];

    // Handler functions
    const handleNext = async (validateForm, values, setTouched) => {
        const errors = await validateForm();
        const stepFields = Object.keys(communityWorkerValidationSchemas[activeStep].fields);   
        const touchedFields = {};
        stepFields.forEach(field => {
          touchedFields[field] = true;
        });
        setTouched(touchedFields);
        const hasStepErrors = stepFields.some(field => errors[field]);   
        
        if (!hasStepErrors && activeStep < steps.length - 1) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
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

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };

    const handleSubmit = (values, { setSubmitting }) => {
        console.log("Form submitted successfully with data:", values);
        setSubmitting(false);
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

    // Effects
    useEffect(() => {
        return () => {
            debouncedFetchLocation.cancel();
        };
    }, [debouncedFetchLocation]);


    const handleEditQualification = (qualification, index) => {
        setEditQualificationData({ ...qualification, index }); // Use correct setter
        // console.log("the edit values ", { ...qualification, index });
        
        setOpenQualificationModal(true); // Use correct modal state
    };

    const handleEditorganizationName= (organizations, index) => {
        setEditOrganizationData({ ...organizations, index }); // Use correct setter
        console.log("the values of edit org data  is  ----", { ...organizations, index });
        
        setOpenOrganizationNameModal(true); // Use correct modal state
    };

    const handleDeleteQualification = (index, values, setFieldValue) => {
    const updated = values.qualifications.filter((_, i) => i !== index);
    setFieldValue("qualifications", updated);
    };
        
    const handleSaveQualification = (qual, isEditMode, values, setFieldValue, setFieldTouched) => {
        if (isEditMode && editQualificationData?.index !== undefined) {
            // console.log("if condition is called here ------ > ", isEditMode);
            
            const updatedQualifications = [...values.qualifications];
            updatedQualifications[editQualificationData.index] = qual;
            setFieldValue('qualifications', updatedQualifications);
        } else {
            setFieldValue('qualifications', [...values.qualifications, qual]);
            // console.log("the values of qualification -------- >", ...values.qualifications);
            
        }

        setFieldTouched('qualifications', true);
        setEditQualificationData(null);
        setOpenQualificationModal(false);
    };

    const handleSaveOrganization = (org, isEditMode, values, setFieldValue, setFieldTouched) => {
        if (isEditMode && editOrganizationData?.index !== undefined) {
            const updatedorganizations = [...values.organizations];
            updatedorganizations[editOrganizationData.index] = org;
            setFieldValue('organizations', updatedorganizations);
        } else {
            setFieldValue('organizations', [...values.organizations, org]);
            console.log(" organizations",  ...values.organizations);
        }
        setFieldTouched('organizations', true);
        setEditOrganizationData(null);
        setOpenOrganizationNameModal(false);
    };

    const handleCloseQualificationModal = () => {
        setOpenQualificationModal(false);
        setEditQualificationData(null);
    };

    const handleCloseOrganizationModal = () => {    
        setOpenOrganizationNameModal(false);
        setEditOrganizationData(null);
    };


    return (
        <>
            <Layout>
                <CustomCard title="Community Worker Registration">
                    <Container 
                        maxWidth="sm"
                        sx={{ py: 3, mx: "auto" }}
                    >
                        <CustomStepper steps={steps} activeStep={activeStep} />
                        
                        <Formik
                            initialValues={communityWorkerInitialValues}
                            validationSchema={communityWorkerValidationSchemas[activeStep]}
                            onSubmit={handleSubmit}
                            validateOnChange={true}
                            validateOnBlur={true}
                        >
                            {({ 
                                values, 
                                errors, 
                                touched, 
                                setFieldError, 
                                setFieldTouched, 
                                handleChange, 
                                handleBlur, 
                                setFieldValue, 
                                validateForm, 
                                setTouched, 
                                isSubmitting, 
                            }) => (
                                <Form>
                                    <Box elevation={0}>
                                        {/* Step 0: Profile */}
                                        {activeStep === 0 && (
                                            <>
                                                <StepHeader 
                                                    src="/profile.svg" 
                                                    title="I Am Community Health Worker / Profile"
                                                />
                                                
                                                {/* Title and First Name Row */}
                                                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                                    <FormControl 
                                                        sx={{ minWidth: 120 }} 
                                                        error={touched.title && Boolean(errors.title)}
                                                    >
                                                        <Select
                                                            name="title"
                                                            value={values.title}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            displayEmpty
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
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(/[^A-Za-z]/g, '');
                                                            setFieldValue('firstName', value);
                                                        }}
                                                        onBlur={handleBlur}
                                                        error={touched.firstName && Boolean(errors.firstName)}
                                                        helperText={touched.firstName && errors.firstName}
                                                    />
                                                </Box>

                                                {/* Last Name */}
                                                <Box sx={{ mb: 2 }}>
                                                    <CustomTextField
                                                        fullWidth
                                                        name="lastName"
                                                        placeholder="Last Name*"
                                                        value={values.lastName}
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(/[^A-Za-z]/g, '');
                                                            setFieldValue('lastName', value);
                                                        }}
                                                        onBlur={handleBlur}
                                                        error={touched.lastName && Boolean(errors.lastName)}
                                                        helperText={touched.lastName && errors.lastName}
                                                    />
                                                </Box>

                                                {/* Qualifications Section */}
                                                <Box sx={{ 
                                                    display: "flex", 
                                                    flexDirection: "column", 
                                                    gap: 2, 
                                                    fontFamily: "Nunito, sans-serif", 
                                                    color: "rgba(0, 0, 0, 0.87)" 
                                                }}>
                                                    {/* Header with Add Button - Hide when qualification exists */}
                                                    <Box sx={{ 
                                                        display: "flex", 
                                                        alignItems: "center", 
                                                        justifyContent: "space-between" 
                                                    }}>
                                                        <Typography variant="h6">Qualifications*</Typography>
                                                        {/* Hide Add button if qualification already exists */}
                                                        {values.qualifications.length === 0 && (
                                                            <CustomButton 
                                                                type="button" 
                                                                label="Add" 
                                                                onClick={() => setOpenQualificationModal(true)} 
                                                            />
                                                        )}
                                                    </Box>

                                                    {/* Display added qualifications */}
                                                    <Box sx={{ mb: 2 }}>
                                                        {values.qualifications.length === 0 ? (
                                                            <Typography variant="body1" color="text.secondary">
                                                                No qualifications are added.
                                                            </Typography>
                                                        ) : (
                                                            values.qualifications.map((q, idx) => (
                                                                <Box key={idx} sx={{ mb: 1 }}>
                                                                    <TextField
                                                                        fullWidth
                                                                        // value={`${q.qualification} - ${q.institute} (Completed: ${q.completionDate})`}
                                                                        value = {q.qualification}
                                                                        variant="outlined"
                                                                        InputProps={{
                                                                            readOnly: true,
                                                                            endAdornment: (
                                                                                <InputAdornment position="end">

                                                                                    <IconButton
                                                                                        color="primary"
                                                                                        onClick={() => handleEditQualification(q, idx)}
                                                                                        sx={{ mr: 0.5 }}
                                                                                    >
                                                                                        <EditIcon />
                                                                                    </IconButton>

                                                                                    {/* <IconButton
                                                                                        color="error"
                                                                                        onClick={() => handleDeleteQualification(idx)}
                                                                                    >
                                                                                        <DeleteIcon />
                                                                                    </IconButton> */}

                                                                            <IconButton
                                                                                color="error"
                                                                                onClick={() => {
                                                                                    const updated = values.qualifications.filter((_, i) => i !== idx);
                                                                                    setFieldValue("qualifications", updated);
                                                                                }}
                                                                            >
                                                                                <DeleteIcon />
                                                                            </IconButton>

                                                                                </InputAdornment>
                                                                            ),
                                                                        }}
                                                                    />
                                                                </Box>
                                                            ))
                                                        )}
                                                    </Box>

                                                    {/* Validation Error */}
                                                    {touched.qualifications && errors.qualifications && (
                                                        <FormHelperText error>
                                                            {errors.qualifications}
                                                        </FormHelperText>
                                                    )}

                                                    {/* Modal */}
                                                    <AddQualificationModal
                                                        open={openQualificationModal}
                                                        // onClose={() => setOpenQualificationModal(false)}
                                                        // onSave={(qual) => {
                                                        //     setFieldValue('qualifications', [...values.qualifications, qual]);
                                                        //     setFieldTouched('qualifications', true);
                                                        // }}

                                                        editData={editQualificationData} 
                                                       // onSave={handleSaveQualification}
                                                        onSave={(qual, isEditMode) => handleSaveQualification(qual, isEditMode, values, setFieldValue, setFieldTouched)}
                                                        onClose={handleCloseQualificationModal}
                                                    />
                                                </Box>

                                                {/* Registration Section */}
                                                <Box sx={{ 
                                                    display: 'flex', 
                                                    flexDirection: 'column', 
                                                    mb: 2 
                                                }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                                        Registration
                                                    </Typography>
                                                    <CustomTextField
                                                        fullWidth
                                                        name="registration"
                                                        placeholder="Registration no."
                                                        value={values.registration}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={touched.registration && Boolean(errors.registration)}
                                                        helperText={touched.registration && errors.registration}
                                                    /> 
                                                </Box>

                                                {/* Organization Switch */}
                                                <Box sx={{ 
                                                    display: "flex", 
                                                    alignItems: "center", 
                                                    justifyContent: "space-between", 
                                                    fontFamily: "Nunito, sans-serif", 
                                                    color: "rgba(0, 0, 0, 0.87)", 
                                                    mb: 2 
                                                }}>
                                                    <Typography variant="body1">
                                                        Are you working with any organization?
                                                    </Typography>
                                                    <Switch 
                                                        checked={values.isWorking} 
                                                        onChange={(e) => {
                                                            setFieldValue('isWorking', e.target.checked);
                                                            if (!e.target.checked) {
                                                                setFieldValue('organizations', []);
                                                            }
                                                        }}
                                                        name="isWorking" 
                                                        color="primary" 
                                                    />
                                                </Box>

                                                {/* Organization Section */}
                                                {values.isWorking && (
                                                    <Box sx={{ 
                                                        display: "flex", 
                                                        flexDirection: "column", 
                                                        gap: 2, 
                                                        fontFamily: "Nunito, sans-serif", 
                                                        color: "rgba(0, 0, 0, 0.87)" 
                                                    }}>
                                                        <Box sx={{ 
                                                            display: "flex", 
                                                            alignItems: "center", 
                                                            justifyContent: "space-between" 
                                                        }}>
                                                            <Typography variant="h6">Organization*</Typography>
                                                            {values.organizations.length === 0 && (
                                                                 <CustomButton 
                                                                type="button" 
                                                                label="Add" 
                                                                onClick={() => setOpenOrganizationNameModal(true)} 
                                                            />
                                                            )}

                                                            {/* <CustomButton 
                                                                type="button" 
                                                                label="Add" 
                                                                onClick={() => setOpenOrganizationNameModal(true)} 
                                                            /> */}
                                                        </Box>

                                                        {/* Show added organizations */}
                                                        {values.organizations.length > 0 && (
                                                            <Box sx={{ mt: 1 }}>
                                                                {values.organizations.map((org, idx) => (
                                                                    // <Typography key={idx} variant="body2">
                                                                    //     • {org.organizationName || org}
                                                                    // </Typography>

                                                                      <TextField
                                                                        fullWidth
                                                                        key={idx}
                                                                        value={org.organizationName || org}
                                                                        // label="Qualification"
                                                                        variant="outlined"

                                                                        InputProps={{
                                                                            readOnly: true,
                                                                            endAdornment: (
                                                                                <InputAdornment position="end">

                                                                                    <IconButton
                                                                                        color="primary"
                                                                                        onClick={() => handleEditorganizationName(org, idx)}
                                                                                        sx={{ mr: 0.5 }}
                                                                                    >
                                                                                        <EditIcon />
                                                                                    </IconButton>

                                                                                    {/* <IconButton
                                                                                        color="error"
                                                                                        onClick={() => handleDeleteQualification(idx)}
                                                                                    >
                                                                                        <DeleteIcon />
                                                                                    </IconButton> */}

                                                                            <IconButton
                                                                                color="error"
                                                                                onClick={() => {
                                                                                    const updated = values.organizations.filter((_, i) => i !== idx);
                                                                                    setFieldValue("organizations", updated);
                                                                                }}
                                                                            >
                                                                                <DeleteIcon />
                                                                            </IconButton>

                                                                                </InputAdornment>
                                                                            ),
                                                                        }}


                                                                        />
                                                                ))}
                                                            </Box>


                                                            
                                                        )}

                                                        {/* Validation Error */}
                                                        {touched.organizations && errors.organizations && (
                                                            <FormHelperText error>
                                                                {errors.organizations}
                                                            </FormHelperText>
                                                        )}
                                                    </Box>
                                                )}

                                                {/* Modal */}
                                                <AddOrganizationModal
                                                    open={openOrganizationNameModal} 
                                                    onClose={() => setOpenOrganizationNameModal(false)}

                                                    // onSave={(org) => {
                                                    //     setFieldValue('organizations', [...values.organizations, org]);
                                                    //     setFieldTouched('organizations', true);
                                                    // }}
                                                    
                                                    editData={editOrganizationData}
                                                    onSave={(org, isEditMode) => handleSaveOrganization(org, isEditMode, values, setFieldValue, setFieldTouched)}
                                                />
                                            </>
                                        )}

                                        {/* Step 1: Gender */}
                                        {activeStep === 1 && (
                                            <>
                                                <StepHeader 
                                                    src="/gender.svg" 
                                                    title="I Am Community Health Worker / Gender" 
                                                />
                                                <GenderSelector
                                                    value={values.gender}
                                                    onChange={(gender) => setFieldValue('gender', gender)}
                                                    isPregnant={values.isPregnant}
                                                    setFieldValue={setFieldValue}
                                                    error={touched.gender && errors.gender}
                                                    showPregnantToggle={false} 
                                                />
                                            </>
                                        )}

                                        {/* Step 2: Age */}
                                        {activeStep === 2 && (
                                            <>
                                                <StepHeader 
                                                    src="/age.svg" 
                                                    title="I Am Community Health Worker / Age" 
                                                />
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
                                                />
                                            </>
                                        )}

                                        {/* Step 3: Address */}
                                        {activeStep === 3 && (
                                            <>
                                                <StepHeader 
                                                    src="/address.svg" 
                                                    title="I Am Community Health Worker / Address" 
                                                />
                                                
                                                {/* Address Type */}
                                                <Box sx={{ mb: 3 }}>
                                                    <Typography 
                                                        variant="caption" 
                                                        sx={{ 
                                                            color: '#333', 
                                                            mb: 0.5, 
                                                            display: 'block', 
                                                            pl: 1 
                                                        }}
                                                    >
                                                        Select Address Type*
                                                    </Typography>
                                                    <FormControl 
                                                        fullWidth 
                                                        error={touched.addressType && Boolean(errors.addressType)}
                                                    >
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

                                                {/* ZipCode and City Row */}
                                                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                                                    <Box sx={{ flex: 1 }}>
                                                        <CustomTextField
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
                                                        <CustomTextField
                                                            fullWidth
                                                            name="city"
                                                            placeholder="City*"
                                                            value={values.city}
                                                            error={touched.city && Boolean(errors.city)}
                                                            helperText={touched.city && errors.city}
                                                            InputProps={{
                                                                readOnly: true, 
                                                            }}
                                                        />
                                                    </Box>
                                                </Box>

                                                {/* State and Country Row */}
                                                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                                                    <Box sx={{ flex: 1 }}>
                                                        <CustomTextField
                                                            fullWidth
                                                            name="state"
                                                            placeholder="State*"
                                                            value={values.state}
                                                            error={touched.state && Boolean(errors.state)}
                                                            helperText={touched.state && errors.state}
                                                            InputProps={{
                                                                readOnly: true, 
                                                            }}
                                                        />
                                                    </Box>
                                                    <Box sx={{ flex: 1 }}>
                                                        <CustomTextField
                                                            fullWidth
                                                            name="country"
                                                            placeholder="Country*"
                                                            value={values.country}
                                                            error={touched.country && Boolean(errors.country)}
                                                            helperText={touched.country && errors.country}
                                                            InputProps={{
                                                                readOnly: true, 
                                                            }}
                                                        />
                                                    </Box>
                                                </Box>

                                                {/* Address Line 1 */}
                                                <Box sx={{ mb: 3 }}>
                                                    <CustomTextField
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

                                                {/* Address Line 2 */}
                                                <Box sx={{ mb: 3 }}>
                                                    <CustomTextField
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

                                        {/* Navigation Buttons */}
                                        <Box sx={{ 
                                            display: 'flex', 
                                            justifyContent: 'flex-end', 
                                            mt: 2, 
                                            gap: 1 
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
                                                    type="submit" 
                                                    label="Submit"
                                                    disabled={isSubmitting} 
                                                />
                                            ) : (
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
        </>
    );
}