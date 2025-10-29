

// import React, { useState } from "react";
// import { 
//   Dialog, 
//   Button, 
//   TextField, 
//   Box, 
//   InputAdornment, 
//   FormControl, 
//   Select, 
//   MenuItem, 
//   FormHelperText 
// } from "@mui/material";
// import CustomCard from "./CustomCard";
// import CustomTextField from "./CustomTextField";
// import CustomButton from "./CustomButton";

// const AddOrganizationModal = ({ open, onClose, onSave }) => {
//   const [organizationName, setOrganizationName] = useState("");

//   const handleSave = () => {
//     if (organizationName.trim() === "") return;
//     onSave(organizationName);
//     setOrganizationName("");
//     onClose();
//   };

//   const IndianFlag = () => (
//     <Box
//       component="svg"
//       viewBox="0 0 225 150"
//       sx={{ width: 30, height: 20, mr: 1 }}
//     >
//       <rect fill="#FF9933" width="225" height="50" />
//       <rect fill="#FFF" y="50" width="225" height="50" />
//       <rect fill="#138808" y="100" width="225" height="50" />
//       <circle fill="#000080" cx="112.5" cy="75" r="20" />
//     </Box>
//   );

//   return (

//     <Dialog
//      open={open} onClose={onClose} 
//      maxWidth="sm" 
//      fullWidth
//      >
//       <CustomCard title="Add Organization" sx={{ p: 0 }}>
      
//       {/* Organization Name */}
//       {/* <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
//         <TextField
//           label="Organization Name"
//           value={organizationName}
//           onChange={(e) => setOrganizationName(e.target.value)}
//           fullWidth
//         />
//       </Box> */}

//       {/* Last Name */}
//       <Box sx={{ mb: 1 }}>
//         <CustomTextField
//           fullWidth
//           name="Organization"
//           placeholder="Organization Name*"
//         />
//       </Box>

//       <Box sx={{ mb: 1 }}>
//         <CustomTextField
//           fullWidth
//           name="Registration"
//           placeholder="Registration No.*"
//         />
//       </Box>

//       {/* ZipCode and City Row */}
//       <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
//         <Box sx={{ flex: 1 }}>
//           <TextField
//             fullWidth
//             name="zipCode"
//             placeholder="ZipCode*"
//             // value={values.zipCode}
//             // onChange={async (e) => {
//             //   let value = e.target.value.replace(/\D/g, "");
//             //   if (value.length > 6) value = value.slice(0, 6);

//             //   setFieldValue("zipCode", value);
//             //   setFieldTouched("zipCode", true);

//             //   if (value.length === 6) {
//             //     const location = await fetchLocationDetails(value);

//             //     if (location.valid) {
//             //       setFieldValue("city", location.city);
//             //       setFieldValue("state", location.state);
//             //       setFieldValue("country", location.country);
//             //       setFieldError("zipCode", "");
//             //     } else {
//             //       setFieldValue("city", "");
//             //       setFieldValue("state", "");
//             //       setFieldValue("country", "");
//             //       setFieldError("zipCode", "Invalid ZIP code");
//             //         setFieldTouched("zipCode", true, false);
//             //     }
//             //   } else {
//             //     setFieldValue("city", "");
//             //     setFieldValue("state", "");
//             //     setFieldValue("country", "");
//             //     setFieldError("zipCode", "");
//             //   }
//             // }}
//             // error={touched.zipCode && Boolean(errors.zipCode)}
//             // helperText={touched.zipCode && errors.zipCode}
//             // onBlur={handleBlur}
//           />
//         </Box>
//         <Box sx={{ flex: 1 }}>
//           <TextField
//             fullWidth
//             name="city"
//             placeholder="City*"
//             // value={values.city}
//             // onChange={handleChange}
//             // onBlur={handleBlur}
//             // error={touched.city && Boolean(errors.city)}
//             // helperText={touched.city && errors.city}
//             // InputProps={{
//             //   readOnly: true, 
//             // }}
//           />
//         </Box>
//       </Box>

//       {/* State and Country Row */}
//       <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
//         <Box sx={{ flex: 1 }}>
//           <TextField
//             fullWidth
//             name="state"
//             placeholder="State*"
//             // value={values.state}
//             // InputProps={{
//             //   readOnly: true, 
//             // }}
//           />
//         </Box>
//         <Box sx={{ flex: 1 }}>
//           <TextField
//             fullWidth
//             name="country"
//             placeholder="Country*"
//             // value={values.country}
//             // InputProps={{
//             //   readOnly: true, 
//             // }}
//           />
//         </Box>
//       </Box>

//       {/* Address Line 1 */}
//       <Box sx={{ mb: 1 }}>
//         <TextField
//           fullWidth
//           name="address1"
//           placeholder="Address 1*"
//           // value={values.address1}
//           // onChange={handleChange}
//           // onBlur={handleBlur}
//           // error={touched.address1 && Boolean(errors.address1)}
//           // helperText={touched.address1 && errors.address1}
//         />
//       </Box>

//       {/* Address Line 2 */}  
//       <Box sx={{ mb: 1 }}>
//         <TextField
//           fullWidth
//           name="address2"
//           placeholder="Address 2"
//           // value={values.address2}
//           // onChange={handleChange}
//           // onBlur={handleBlur}
//         />
//       </Box>

//       {/* Additional Address Line 2 */}
//       <Box sx={{ mb: 1 }}>
//         <TextField
//           fullWidth
//           name="ContactPersonName"
//           placeholder="Contact Person Name*"
//           // value={values.address2}
//           // onChange={handleChange}
//           // onBlur={handleBlur}
//         />
//       </Box>

//       {/* Phone Number */}
//       <Box sx={{ mb: 1 }}>
//         <TextField
//           fullWidth
//           name="phoneNumber"
//           // value={values.phoneNumber}
//           // onChange={(e) => {
//           //   let value = e.target.value.replace(/\D/g, '');
//           //   if (value.length > 10) value = value.slice(0, 10);
//           //   if (value.length > 5) {
//           //     value = value.slice(0, 5) + '-' + value.slice(5);
//           //   }

//           //   setFieldValue('phoneNumber', value);
//           // }}
//           // onBlur={handleBlur}
//           // error={touched.phoneNumber && Boolean(errors.phoneNumber)}
//           // helperText={touched.phoneNumber && errors.phoneNumber}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <IndianFlag /> +91
//               </InputAdornment>
//             ),
//           }}
//           // placeholder="Please Enter The Number "
//         />
//       </Box>

//       {/* Additional Address Line 2 */}
//       <Box sx={{ mb: 1 }}>
//         <TextField
//           fullWidth
//           name="Email"
//           placeholder="Email Address*"
//           // value={values.address2}
//           // onChange={handleChange}
//           // onBlur={handleBlur}
//         />
//       </Box>

//       {/* Title Selector 1 */}
//       <Box sx={{ mb: 1 }}>
//         <FormControl
//           fullWidth
//           // sx={{ minWidth: 120 }} 
//           // error={touched.title && Boolean(errors.title)}
//         >
//           <Select
//             name="title"
//             // value={"Select Oraganization Type*"}
//             // value={values.title}
//             // onChange={handleChange}
//             // onBlur={handleBlur}
//           >
//             <MenuItem value="Private">Private</MenuItem>
//             <MenuItem value="Goverment">Goverment</MenuItem>
//             {/* <MenuItem value="Mrs.">Mrs.</MenuItem>
//             <MenuItem value="Ms.">Ms.</MenuItem>
//             <MenuItem value="Baby">Baby</MenuItem>
//             <MenuItem value="Dr.">Dr.</MenuItem>
//             <MenuItem value="Master">Master</MenuItem> */}
//           </Select>
//           {/* {touched.title && errors.title && (
//             <FormHelperText>{errors.title}</FormHelperText>
//           )} */}
//         </FormControl>
//       </Box>

//       {/* Title Selector 2 */}
//       <Box sx={{ mb: 1 }}>
//         <FormControl
//           fullWidth
//           // sx={{ minWidth: 120 }} 
//           // error={touched.title && Boolean(errors.title)}
//         >
//           <Select
//             name="title"
//             // value={"Select Organization Type*"}
//             // value={values.title}
//             // onChange={handleChange}
//             // onBlur={handleBlur}
//           >
//             <MenuItem value="ForProfit">For-Profit</MenuItem>
//             <MenuItem value="NonProfit">Non-Profit</MenuItem>
//             {/* <MenuItem value="Mrs.">Mrs.</MenuItem>
//             <MenuItem value="Ms.">Ms.</MenuItem>
//             <MenuItem value="Baby">Baby</MenuItem>
//             <MenuItem value="Dr.">Dr.</MenuItem>
//             <MenuItem value="Master">Master</MenuItem> */}
//           </Select>
//           {/* {touched.title && errors.title && (
//             <FormHelperText>{errors.title}</FormHelperText>
//           )} */}
//         </FormControl>
//       </Box>

//       {/* Action Buttons */}
//       <Box sx={{ 
//         display: "flex", 
//         justifyContent: "flex-end", 
//         gap: 1, 
//         mt: 3 
//       }}>  
//       <CustomButton
//         type="button"
//         // onClick={() => handleNext(validateForm, values, setTouched)}
//         label="Save"
//       />
//       </Box>
//       </CustomCard>
//     </Dialog>
//   );
// };

// export default AddOrganizationModal;













import React, { useState } from "react";
import { 
  Dialog, 
  TextField, 
  Box, 
  InputAdornment, 
  FormControl, 
  Select, 
  MenuItem, 
  FormHelperText 
} from "@mui/material";
import { Formik, Form } from "formik";
import CustomCard from "./CustomCard";
import CustomTextField from "./CustomTextField";
import CustomButton from "./CustomButton";
import { organizationValidationSchema, organizationInitialValues } from "./../utils/profileValidation";

const AddOrganizationModal = ({ open, onClose, onSave, editData }) => {
  
  const fetchLocationDetails = async (zipCode) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`https://api.postalpincode.in/pincode/${zipCode}`);
      const data = await response.json();
      
      if (data[0].Status === "Success" && data[0].PostOffice) {
        const location = data[0].PostOffice[0];
        return {
          valid: true,
          city: location.District,
          state: location.State,
          country: "India"
        };
      }
      return { valid: false };
    } catch (error) {
      return { valid: false };
    }
  };

  // const handleSubmit = (values, { setSubmitting, resetForm }) => {
  //   onSave(values);
  //   resetForm();
  //   onClose();
  //   setSubmitting(false);
  // };

  const isEditMode = Boolean(editData);
  
  const initialValues = editData
    ? {
        organizationName: editData.organizationName,
        registrationNo: editData.registrationNo,
        zipCode:editData.zipCode,
        city: editData.city,
        state: editData.state,
        country:editData.country ,
        address1: editData.address1,
        address2: editData.address2,
        contactPersonName: editData.contactPersonName,
        phoneNumber: editData.phoneNumber,
        email: editData.email,
        organizationType1: editData.organizationType1,
        organizationType2: editData.organizationType2,
    }
  : organizationInitialValues;

  const handleSubmit = (values, {setSubmitting, resetForm}) =>{
    const newData = {
      id: editData ? editData.id : Date.now(),
      organizationName: values.organizationName,
      registrationNo: values.registrationNo,
      zipCode: values.zipCode,
      city: values.city,
      state: values.state,
      country: values.country,
      address1: values.address1,
      address2: values.address2,
      contactPersonName: values.contactPersonName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      organizationType1: values.organizationType1,
      organizationType2: values.organizationType2,

    };
    onSave(newData, isEditMode);
    resetForm();
    onClose();
    setSubmitting(false);
  }

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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* <CustomCard title="Add Organization" sx={{ p: 0 }}> */}
        <CustomCard title={isEditMode ? "Edit Organization": "Add orgranization" } sx = {{ p: 0 }} onClose={onClose} >
        <Formik
          // initialValues={organizationInitialValues}
          initialValues = {initialValues}
          validationSchema={organizationValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            setFieldError,
            setFieldTouched,
            isSubmitting,
          }) => (
            <Form>
              {/* Organization Name */}
              <Box sx={{ mb: 1 }}>
                <TextField
                  fullWidth
                  name="organizationName"
                  placeholder="Organization Name*"
                  value={values.organizationName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.organizationName && Boolean(errors.organizationName)}
                  helperText={touched.organizationName && errors.organizationName}
                />
              </Box>

              {/* Registration Number */}
              <Box sx={{ mb: 1 }}>
                <TextField
                  fullWidth
                  name="registrationNo"
                  placeholder="Registration No.*"
                  value={values.registrationNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.registrationNo && Boolean(errors.registrationNo)}
                  helperText={touched.registrationNo && errors.registrationNo}
                />
              </Box>

              {/* ZipCode and City Row */}
              <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
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
                <Box sx={{ flex: 1, }}>
                  <TextField
                    fullWidth
                    name="city"
                    placeholder="City*"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.city && Boolean(errors.city)}
                    helperText={touched.city && errors.city}
                    InputProps={{
                      readOnly: true, 
                    }}
                  />
                </Box>
              </Box>

              {/* State and Country Row */}
              <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                <Box sx={{ flex: 1 }}>
                  <TextField
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
                  <TextField
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
              <Box sx={{ mb: 1 }}>
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

              {/* Address Line 2 */}  
              <Box sx={{ mb: 1 }}>
                <TextField
                  fullWidth
                  name="address2"
                  placeholder="Address 2"
                  value={values.address2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Box>

              {/* Contact Person Name */}
              <Box sx={{ mb: 1 }}>
                <TextField
                  fullWidth
                  name="contactPersonName"
                  placeholder="Contact Person Name*"
                  value={values.contactPersonName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.contactPersonName && Boolean(errors.contactPersonName)}
                  helperText={touched.contactPersonName && errors.contactPersonName}
                />
              </Box>

              {/* Phone Number */}
              <Box sx={{ mb: 1 }}>
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
                  placeholder="Phone Number*"
                />
              </Box>

              {/* Email Address */}
              <Box sx={{ mb: 1 }}>
                <TextField
                  fullWidth
                  name="email"
                  placeholder="Email Address*"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Box>

              {/* Organization Type 1 (Private/Government) */}
              <Box sx={{ mb: 1 }}>
                <FormControl
                  fullWidth
                  error={touched.organizationType1 && Boolean(errors.organizationType1)}
                >
                  <Select
                    name="organizationType1"
                    value={values.organizationType1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select Organization Type*
                    </MenuItem>
                    <MenuItem value="Private">Private</MenuItem>
                    <MenuItem value="Government">Government</MenuItem>
                  </Select>
                  {touched.organizationType1 && errors.organizationType1 && (
                    <FormHelperText>{errors.organizationType1}</FormHelperText>
                  )}
                </FormControl>
              </Box>

              {/* Organization Type 2 (For-Profit/Non-Profit) */}
              <Box sx={{ mb: 1 }}>
                <FormControl
                  fullWidth
                  error={touched.organizationType2 && Boolean(errors.organizationType2)}
                >
                  <Select
                    name="organizationType2"
                    value={values.organizationType2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select Profit Type*
                    </MenuItem>
                    <MenuItem value="ForProfit">For-Profit</MenuItem>
                    <MenuItem value="NonProfit">Non-Profit</MenuItem>
                  </Select>
                  {touched.organizationType2 && errors.organizationType2 && (
                    <FormHelperText>{errors.organizationType2}</FormHelperText>
                  )}
                </FormControl>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ 
                display: "flex", 
                justifyContent: "flex-end", 
                gap: 1, 
                mt: 3
              }}>  
                <CustomButton
                  type="submit"
                  // label="Save"
                  label={isEditMode ? "Update" : "Save"}
                  disabled={isSubmitting}
                />
              </Box>
            </Form>
          )}
        </Formik>
      </CustomCard>
    </Dialog>
  );
};

export default AddOrganizationModal;




















// import React, { useState } from "react";
// import { 
//   Dialog, 
//   TextField, 
//   Box, 
//   InputAdornment, 
//   FormControl, 
//   Select, 
//   MenuItem, 
//   FormHelperText 
// } from "@mui/material";
// import { Formik, Form } from "formik";
// import CustomCard from "./CustomCard";
// import CustomTextField from "./CustomTextField";
// import CustomButton from "./CustomButton";
// import { organizationValidationSchema, organizationInitialValues } from "./../utils/profileValidation";

// const AddOrganizationModal = ({ open, onClose, onSave }) => {
  
//   const fetchLocationDetails = async (zipCode) => {
//     try {
//       // Replace with your actual API endpoint
//       const response = await fetch(`https://api.postalpincode.in/pincode/${zipCode}`);
//       const data = await response.json();
      
//       if (data[0].Status === "Success" && data[0].PostOffice) {
//         const location = data[0].PostOffice[0];
//         return {
//           valid: true,
//           city: location.District,
//           state: location.State,
//           country: "India"
//         };
//       }
//       return { valid: false };
//     } catch (error) {
//       return { valid: false };
//     }
//   };

//   // const handleSubmit = (values, { setSubmitting, resetForm }) => {
//   //   onSave(values);
//   //   resetForm();
//   //   onClose();
//   //   setSubmitting(false);
//   // };

//    const isEditMode = Boolean(editData);
  
//     const initialValues = editData
//       ? {
//           qualification: editData.qualification,
//           institute: editData.institute,
//           completionDate: dayjs(editData.completionDate),
//         }
//       : qualificationInitialValues;
  
//     const handleSubmit = (values, { setSubmitting, resetForm }) => {    
//       const newData = {
//         id: editData ? editData.id : Date.now(),
//         title: values.title,
//         firstName: values.firstName,
//         lastName: values.lastName,
//         registration: values.registration,
//         qualifications: values.qualifications,
//         isWorking: values.isWorking,
//         organizations: values.organizations,
//         gender: values.gender,
//         isPregnant: values.isPregnant,
//         birthdate: values.birthdate,
//         age: values.age,
//         addressType: values.addressType,
//         zipCode: values.zipCode,
//         city: values.city,
//         state: values.state,
//         country: values.country,
//         address1: values.address1,
//         address2: values.address2,
//         // qualification: values.qualification,
//         // institute: values.institute,
//         // completionDate: values.completionDate.format("YYYY-MM-DD"),
//       };
  
//       onSave(newData, isEditMode);
//       resetForm();
//       onClose();
//       setSubmitting(false);
//     };
  


//   const IndianFlag = () => (
//     <Box
//       component="svg"
//       viewBox="0 0 225 150"
//       sx={{ width: 30, height: 20, mr: 1 }}
//     >
//       <rect fill="#FF9933" width="225" height="50" />
//       <rect fill="#FFF" y="50" width="225" height="50" />
//       <rect fill="#138808" y="100" width="225" height="50" />
//       <circle fill="#000080" cx="112.5" cy="75" r="20" />
//     </Box>
//   );

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       {/* <CustomCard title="Add Organization" sx={{ p: 0 }}> */}
//       <CustomCard title={isEditMode ? "Edit Qualification" : "Add Qualification"} sx={{ p: 0 }}>
//         <Formik
//           // initialValues={organizationInitialValues}
//           initialValues={initialValues}
//           validationSchema={organizationValidationSchema}
//           onSubmit={handleSubmit}
//           enableReinitialize
//         >
//           {({
//             values,
//             errors,
//             touched,
//             handleChange,
//             handleBlur,
//             setFieldValue,
//             setFieldError,
//             setFieldTouched,
//             isSubmitting,
//           }) => (
//             <Form>
//               {/* Organization Name */}
//               <Box sx={{ mb: 1 }}>
//                 <TextField
//                   fullWidth
//                   name="organizationName"
//                   placeholder="Organization Name*"
//                   value={values.organizationName}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.organizationName && Boolean(errors.organizationName)}
//                   helperText={touched.organizationName && errors.organizationName}
//                 />
//               </Box>

//               {/* Registration Number */}
//               <Box sx={{ mb: 1 }}>
//                 <TextField
//                   fullWidth
//                   name="registrationNo"
//                   placeholder="Registration No.*"
//                   value={values.registrationNo}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.registrationNo && Boolean(errors.registrationNo)}
//                   helperText={touched.registrationNo && errors.registrationNo}
//                 />
//               </Box>

//               {/* ZipCode and City Row */}
//               <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
//                 <Box sx={{ flex: 1 }}>
//                   <TextField
//                     fullWidth
//                     name="zipCode"
//                     placeholder="ZipCode*"
//                     value={values.zipCode}
//                     onChange={async (e) => {
//                       let value = e.target.value.replace(/\D/g, "");
//                       if (value.length > 6) value = value.slice(0, 6);

//                       setFieldValue("zipCode", value);
//                       setFieldTouched("zipCode", true);

//                       if (value.length === 6) {
//                         const location = await fetchLocationDetails(value);

//                         if (location.valid) {
//                           setFieldValue("city", location.city);
//                           setFieldValue("state", location.state);
//                           setFieldValue("country", location.country);
//                           setFieldError("zipCode", "");
//                         } else {
//                           setFieldValue("city", "");
//                           setFieldValue("state", "");
//                           setFieldValue("country", "");
//                           setFieldError("zipCode", "Invalid ZIP code");
//                           setFieldTouched("zipCode", true, false);
//                         }
//                       } else {
//                         setFieldValue("city", "");
//                         setFieldValue("state", "");
//                         setFieldValue("country", "");
//                         setFieldError("zipCode", "");
//                       }
//                     }}
//                     error={touched.zipCode && Boolean(errors.zipCode)}
//                     helperText={touched.zipCode && errors.zipCode}
//                     onBlur={handleBlur}
//                   />
//                 </Box>
//                 <Box sx={{ flex: 1, }}>
//                   <TextField
//                     fullWidth
//                     name="city"
//                     placeholder="City*"
//                     value={values.city}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     error={touched.city && Boolean(errors.city)}
//                     helperText={touched.city && errors.city}
//                     InputProps={{
//                       readOnly: true, 
//                     }}
//                   />
//                 </Box>
//               </Box>

//               {/* State and Country Row */}
//               <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
//                 <Box sx={{ flex: 1 }}>
//                   <TextField
//                     fullWidth
//                     name="state"
//                     placeholder="State*"
//                     value={values.state}
//                     error={touched.state && Boolean(errors.state)}
//                     helperText={touched.state && errors.state}
//                     InputProps={{
//                       readOnly: true, 
//                     }}
//                   />
//                 </Box>
//                 <Box sx={{ flex: 1 }}>
//                   <TextField
//                     fullWidth
//                     name="country"
//                     placeholder="Country*"
//                     value={values.country}
//                     error={touched.country && Boolean(errors.country)}
//                     helperText={touched.country && errors.country}
//                     InputProps={{
//                       readOnly: true, 
//                     }}
//                   />
//                 </Box>
//               </Box>

//               {/* Address Line 1 */}
//               <Box sx={{ mb: 1 }}>
//                 <TextField
//                   fullWidth
//                   name="address1"
//                   placeholder="Address 1*"
//                   value={values.address1}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.address1 && Boolean(errors.address1)}
//                   helperText={touched.address1 && errors.address1}
//                 />
//               </Box>

//               {/* Address Line 2 */}  
//               <Box sx={{ mb: 1 }}>
//                 <TextField
//                   fullWidth
//                   name="address2"
//                   placeholder="Address 2"
//                   value={values.address2}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//               </Box>

//               {/* Contact Person Name */}
//               <Box sx={{ mb: 1 }}>
//                 <TextField
//                   fullWidth
//                   name="contactPersonName"
//                   placeholder="Contact Person Name*"
//                   value={values.contactPersonName}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.contactPersonName && Boolean(errors.contactPersonName)}
//                   helperText={touched.contactPersonName && errors.contactPersonName}
//                 />
//               </Box>

//               {/* Phone Number */}
//               <Box sx={{ mb: 1 }}>
//                 <TextField
//                   fullWidth
//                   name="phoneNumber"
//                   value={values.phoneNumber}
//                   onChange={(e) => {
//                     let value = e.target.value.replace(/\D/g, '');
//                     if (value.length > 10) value = value.slice(0, 10);
//                     if (value.length > 5) {
//                       value = value.slice(0, 5) + '-' + value.slice(5);
//                     }
//                     setFieldValue('phoneNumber', value);
//                   }}
//                   onBlur={handleBlur}
//                   error={touched.phoneNumber && Boolean(errors.phoneNumber)}
//                   helperText={touched.phoneNumber && errors.phoneNumber}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <IndianFlag /> +91
//                       </InputAdornment>
//                     ),
//                   }}
//                   placeholder="Phone Number*"
//                 />
//               </Box>

//               {/* Email Address */}
//               <Box sx={{ mb: 1 }}>
//                 <TextField
//                   fullWidth
//                   name="email"
//                   placeholder="Email Address*"
//                   value={values.email}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.email && Boolean(errors.email)}
//                   helperText={touched.email && errors.email}
//                 />
//               </Box>

//               {/* Organization Type 1 (Private/Government) */}
//               <Box sx={{ mb: 1 }}>
//                 <FormControl
//                   fullWidth
//                   error={touched.organizationType1 && Boolean(errors.organizationType1)}
//                 >
//                   <Select
//                     name="organizationType1"
//                     value={values.organizationType1}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     displayEmpty
//                   >
//                     <MenuItem value="" disabled>
//                       Select Organization Type*
//                     </MenuItem>
//                     <MenuItem value="Private">Private</MenuItem>
//                     <MenuItem value="Government">Government</MenuItem>
//                   </Select>
//                   {touched.organizationType1 && errors.organizationType1 && (
//                     <FormHelperText>{errors.organizationType1}</FormHelperText>
//                   )}
//                 </FormControl>
//               </Box>

//               {/* Organization Type 2 (For-Profit/Non-Profit) */}
//               <Box sx={{ mb: 1 }}>
//                 <FormControl
//                   fullWidth
//                   error={touched.organizationType2 && Boolean(errors.organizationType2)}
//                 >
//                   <Select
//                     name="organizationType2"
//                     value={values.organizationType2}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     displayEmpty
//                   >
//                     <MenuItem value="" disabled>
//                       Select Profit Type*
//                     </MenuItem>
//                     <MenuItem value="ForProfit">For-Profit</MenuItem>
//                     <MenuItem value="NonProfit">Non-Profit</MenuItem>
//                   </Select>
//                   {touched.organizationType2 && errors.organizationType2 && (
//                     <FormHelperText>{errors.organizationType2}</FormHelperText>
//                   )}
//                 </FormControl>
//               </Box>

//               {/* Action Buttons */}
//               <Box sx={{ 
//                 display: "flex", 
//                 justifyContent: "flex-end", 
//                 gap: 1, 
//                 mt: 3 
//               }}>

//                 {/* <CustomButton
//                   type="submit"
//                   label="Save"
//                   disabled={isSubmitting}
//                 /> */}

//                 <CustomButton
//                      type="submit"
//                      // label="Save"
//                      label={isEditMode ? "Update" : "Save"}
//                      disabled={isSubmitting}
//                    />               
                
//               </Box>
//             </Form>
//           )}
//         </Formik>
//       </CustomCard>
//     </Dialog>
//   );
// };

// export default AddOrganizationModal;