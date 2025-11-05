// "use client";

// import CustomCard from "@/app/component/CustomCard";
// import Layout from "@/app/component/Layout";
// import { Button, Container, TextField, Box, Typography, Link, Stepper, Step, StepLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
// import { useFormik } from "formik";
// import { useState } from "react";
// import * as Yup from "yup";

// export default function AbhaNumber() {
    
// const [activeStep, setActiveStep]= useState(0);
// const steps =  Array(2).fill("");

//   const formik = useFormik({
//     initialValues: {
//       abhaNumber: "",
//       otpMethod: "",
//       aadhaarOtp: "",
//       mobileOtp: "",
//       abhaAddress:"",
//     },
//     validationSchema: Yup.object({
//       abhaNumber: Yup.string()
//         .required("ABHA Number is required")
//         .matches(/^\d{14}$/, "ABHA Number must be 14 digits"),

//       otpMethod: Yup.string().required("Please select an OTP method"),

//       aadhaarOtp: Yup.string().when("otpMethod", {
//         is: "aadhaar",
//         then: (schema) => schema
//           .required("Aadhaar OTP is required")
//           .matches(/^\d{6}$/, "OTP must be 6 digits"),
//         otherwise: (schema) => schema.nullable(),
//       }),

//       mobileOtp: Yup.string().when("otpMethod", {
//         is: "mobile",
//         then: (schema) => schema
//           .required("Mobile OTP is required")
//           .matches(/^\d{6}$/, "OTP must be 6 digits"),
//         otherwise: (schema) => schema.nullable(),
//       }),
//     }),
//     onSubmit: async (values) => {
//     //   console.log("Form submitted:", values);
//     //   alert("Login completed successfully!");
//      if (activeStep === 0) {
//     await formik.validateForm();
//     if (
//       !formik.errors.abhaNumber &&
//       !formik.errors.otpMethod &&
//       !formik.errors.aadhaarOtp &&
//       !formik.errors.mobileOtp
//     ) {
//       handleNext();
//     } else {
//       formik.setTouched({
//         abhaNumber: true,
//         otpMethod: true,
//         aadhaarOtp: true,
//         mobileOtp: true,
//       });
//     }
//   } else {
//     console.log("Form submitted:", values);
//     alert("Login completed successfully!");
//   }
//     },
//   });

//   const handleNext = () => {
//         if (activeStep < steps.length - 1) {
//           setActiveStep((prev) => prev + 1);
//           // Reset touched fields for next step
//           formik.setTouched({});
//         }
//     };


//     const handleBack = () => {
//         if (activeStep > 0) {
//           setActiveStep((prev) => prev - 1);
//           formik.setTouched({});
//         }
//       };


//   const handleForgotAbhaNumber = () => {
//     // Add your forgot ABHA number logic here
//     console.log("Forgot ABHA Number clicked");
//     // You can navigate to forgot page or open a modal
//   };

//   const abhaAddressList = [
//         "john@sbx",
//         "john123@sbx",
//         "john.abha@sbx"
//       ];

//   return (
//     <Layout>
//       <CustomCard title="Login With ABHA Number">
//         <Container maxWidth="sm" sx={{ py: 3, mx: "auto" }}>
//              <Stepper activeStep={activeStep}>
//                         {steps.map((_, index) => (
//                         <Step key={index}>
//                             <StepLabel />
//                         </Step>
//                         ))}
//                     </Stepper>
//           <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2, mb: 2 }}>

//             {activeStep  === 0 &&(
//                 <>           
//                     <Box sx={{ mb: 2 }}>
//                     <Typography 
//                         sx={{ 
//                         fontWeight: 600, 
//                         fontSize: "15px",
//                         pl: 1,
//                         mb: 0.5,
//                         color: "text.secondary",
//                         letterSpacing: "0.3px"
//                         }}
//                     >
//                         ABHA Number
//                     </Typography>

//                     <TextField
//                         fullWidth
//                         name="abhaNumber"
//                         placeholder="Enter 14-digit ABHA Number"
//                         value={formik.values.abhaNumber}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.touched.abhaNumber && Boolean(formik.errors.abhaNumber)}
//                         helperText={formik.touched.abhaNumber && formik.errors.abhaNumber}
//                         inputProps={{ maxLength: 14 }}
//                     />

//                     {/* Right aligned link below input */}
//                     <Box sx={{ textAlign: "right", pr: 1, mt: "4px" }}>
//                         <Link
//                         component="button"
//                         type="button"
//                         onClick={handleForgotAbhaNumber}
//                         sx={{
//                             fontSize: "13px",
//                             textDecoration: "none",
//                             cursor: "pointer",
//                             "&:hover": { textDecoration: "underline" }
//                         }}
//                         >
//                         Forgot ABHA Number?
//                         </Link>
//                     </Box>
//                     </Box>

//                     <Box sx={{ mt: 3 }}>
//                     <Typography 
//                         sx={{ 
//                         fontWeight: 600, 
//                         fontSize: "15px",
//                         pl: 1,
//                         color: "text.secondary",
//                         letterSpacing: "0.3px",
//                         mb: 1
//                         }}
//                     >
//                         Validate using
//                     </Typography>

//                     <Box 
//                         sx={{
//                         display: "grid",
//                         gridTemplateColumns: "1fr 1fr",
//                         gap: 2
//                         }}
//                     >
//                         <Box
//                         onClick={() => formik.setFieldValue("otpMethod", "aadhaar")}
//                         sx={{
//                             border: "1px solid #ddd",
//                             borderRadius: "10px",
//                             p: 2,
//                             textAlign: "center",
//                             cursor: "pointer",
//                             bgcolor: formik.values.otpMethod === "aadhaar" ? "#e8f5e9" : "white",
//                             transition: "0.2s",
//                             "&:hover": { borderColor: "#1976d2" }
//                         }}
//                         >
//                         <img src="/aadhaarIcon.png" alt="Aadhaar" width="60" height="60" />
//                         <Typography sx={{ mt: 1, fontWeight: 600 }}>Aadhaar OTP</Typography>
//                         </Box>

//                         <Box
//                         onClick={() => formik.setFieldValue("otpMethod", "mobile")}
//                         sx={{
//                             border: "1px solid #ddd",
//                             borderRadius: "10px",
//                             p: 2,
//                             textAlign: "center",
//                             cursor: "pointer",
//                             bgcolor: formik.values.otpMethod === "mobile" ? "#e8f5e9" : "white",
//                             transition: "0.2s",
//                             "&:hover": { borderColor: "#1976d2" }
//                         }}
//                         >
//                         <img src="/mobileIcon.png" alt="Mobile" width="60" height="60" />
//                         <Typography sx={{ mt: 1, fontWeight: 600 }}>Mobile OTP</Typography>
//                         </Box>
//                     </Box>

//                     {formik.touched.otpMethod && formik.errors.otpMethod && (
//                         <Typography color="error" sx={{ mt: 1, fontSize: "0.75rem", pl: 1 }}>
//                         {formik.errors.otpMethod}
//                         </Typography>
//                     )}

//                     {formik.values.otpMethod === "aadhaar" && (
//                         <Box sx={{ mt: 2 }}>
//                         <Typography 
//                             sx={{ 
//                             fontWeight: 600, 
//                             fontSize: "15px",
//                             pl: 1,
//                             color: "text.secondary",
//                             letterSpacing: "0.3px"
//                             }}
//                         >
//                             Aadhaar OTP
//                         </Typography>
//                         <TextField
//                             fullWidth
//                             name="aadhaarOtp"
//                             placeholder="Enter 6-digit OTP"
//                             value={formik.values.aadhaarOtp}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             error={formik.touched.aadhaarOtp && Boolean(formik.errors.aadhaarOtp)}
//                             helperText={formik.touched.aadhaarOtp && formik.errors.aadhaarOtp}
//                             inputProps={{ maxLength: 6 }}
//                         />
//                         </Box>
//                     )}

//                     {formik.values.otpMethod === "mobile" && (
//                         <Box sx={{ mt: 2 }}>
//                         <Typography 
//                             sx={{ 
//                             fontWeight: 600, 
//                             fontSize: "15px",
//                             pl: 1,
//                             color: "text.secondary",
//                             letterSpacing: "0.3px"
//                             }}
//                         >
//                             Mobile OTP
//                         </Typography>
//                         <TextField
//                             fullWidth
//                             name="mobileOtp"
//                             placeholder="Enter 6-digit OTP"
//                             value={formik.values.mobileOtp}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             error={formik.touched.mobileOtp && Boolean(formik.errors.mobileOtp)}
//                             helperText={formik.touched.mobileOtp && formik.errors.mobileOtp}
//                             inputProps={{ maxLength: 6 }}
//                         />
//                         </Box>
//                     )}
//                     </Box>
//                 </>
//             )}

//             {activeStep === 1 && (
//                 <>
//                      <Box sx={{ mb: 2 }}>
//                                                             <Typography 
//                                                                 sx={{ 
//                                                                 fontWeight: 600, 
//                                                                 fontSize: "15px",
//                                                                 pl: 1,
//                                                                 color: "text.secondary",
//                                                                 letterSpacing: "0.3px",
//                                                                 mb: 1
//                                                                 }}
//                                                             >
//                                                                 Choose the ABHA address you want to log in with <span style={{ color: "red" }}>*</span>
//                                                             </Typography>
                    
//                                                             <RadioGroup
//                                                                 name="abhaAddress"
//                                                                 value={formik.values.abhaAddress}
//                                                                 onChange={(e) => {
//                                                                   formik.setFieldValue("abhaAddress", e.target.value);
//                                                                 // formik.setFieldTouched("abhaAddress", true);
//                                                                 }}
//                                                             >
//                                                                 {abhaAddressList?.map((item, index) => (
//                                                                 <FormControlLabel
//                                                                     key={index}
//                                                                     value={item}
//                                                                     control={<Radio />}
//                                                                     label={item}
//                                                                     sx={{ ml: 1 }}
//                                                                 />
//                                                                 ))}
//                                                             </RadioGroup>
                                                            
//                                                             {formik.touched.abhaAddress && formik.errors.abhaAddress && (
//                                                               <Typography 
//                                                                 sx={{ 
//                                                                   color: "error.main", 
//                                                                   fontSize: "0.75rem",
//                                                                   mt: 1,
//                                                                   ml: 2
//                                                                 }}
//                                                               >
//                                                                 {formik.errors.abhaAddress}
//                                                               </Typography>
//                                                             )}
//                                                             </Box>
//                 </>
//             )}

//             <Box
//             sx={{
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 gap: 1,
//                 mt: 3,
//             }}
//             >
//             {activeStep !== 0 && (
//                 <Button variant="text" onClick={handleBack}>
//                 Back
//                 </Button>
//             )}

//             <Button variant="contained" type="submit">
//                 {activeStep === steps.length - 1 ? "Submit" : "Generate OTP"}
//             </Button>
//             </Box>


                                             

//           </Box>
//         </Container>
//       </CustomCard>
//     </Layout>
//   );
// }






"use client";

import CustomCard from "@/app/component/CustomCard";
import Layout from "@/app/component/Layout";
import { Button, Container, TextField, Box, Typography, Link, Stepper, Step, StepLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

export default function AbhaNumber() {

  const [activeStep, setActiveStep] = useState(0);
  const steps = Array(2).fill("");

  const abhaAddressList = ["john@sbx", "john123@sbx", "john.abha@sbx"];

  const validationSchema = Yup.object({
    abhaNumber: Yup.string()
        .required("ABHA Number is required")
        .matches(/^\d{2}-\d{4}-\d{4}-\d{4}$/, "Format must be 00-0000-0000-0000"),

    otpMethod: Yup.string().required("Please select an OTP method"),

    aadhaarOtp: Yup.string().when("otpMethod", {
      is: "aadhaar",
      then: (schema) =>
        schema.required("Aadhaar OTP is required").matches(/^\d{6}$/, "OTP must be 6 digits"),
      otherwise: (schema) => schema.nullable(),
    }),

    mobileOtp: Yup.string().when("otpMethod", {
      is: "mobile",
      then: (schema) =>
        schema.required("Mobile OTP is required").matches(/^\d{6}$/, "OTP must be 6 digits"),
      otherwise: (schema) => schema.nullable(),
    }),

    abhaAddress: Yup.string().when("$step", {
      is: 1,
      then: (schema) => schema.required("Please select ABHA Address"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      abhaNumber: "",
      otpMethod: "",
      aadhaarOtp: "",
      mobileOtp: "",
      abhaAddress: "",
    },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    context: { step: activeStep },

    onSubmit: async (values) => {
      await formik.validateForm();

      if (activeStep === 0) {
        if (!formik.errors.abhaNumber && !formik.errors.otpMethod && !formik.errors.aadhaarOtp && !formik.errors.mobileOtp) {
          setActiveStep(1);
          formik.setTouched({});
        } else {
          formik.setTouched({
            abhaNumber: true,
            otpMethod: true,
            aadhaarOtp: true,
            mobileOtp: true,
          });
        }
      }

      if (activeStep === 1) {
        if (!formik.errors.abhaAddress) {
          console.log("Form submitted:", values);
          alert("Login completed successfully!");
        } else {
          formik.setTouched({ abhaAddress: true });
        }
      }
    },
  });

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    formik.setTouched({});
  };

  const handleForgotAbhaNumber = () => {
    console.log("Forgot ABHA Number clicked");
  };

  const handleAbhaChange = (e) => {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 2 && value.length <= 6)
    value = value.replace(/^(\d{2})(\d+)/, "$1-$2");
  else if (value.length > 6 && value.length <= 10)
    value = value.replace(/^(\d{2})(\d{4})(\d+)/, "$1-$2-$3");
  else if (value.length > 10)
    value = value.replace(/^(\d{2})(\d{4})(\d{4})(\d+)/, "$1-$2-$3-$4");

  formik.setFieldValue("abhaNumber", value);
};


  return (
    <Layout>
      <CustomCard title="Login With ABHA Number">
        <Container maxWidth="sm" sx={{ py: 3, mx: "auto" }}>

          <Stepper activeStep={activeStep}>
            {steps.map((_, index) => (
              <Step key={index}>
                <StepLabel />
              </Step>
            ))}
          </Stepper>

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2, mb: 2 }}>

            {/* -------- STEP 1 -------- */}
            {activeStep === 0 && (
              <>
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: "15px", pl: 1, mb: 0.5, color: "text.secondary" }}>
                    ABHA Number
                  </Typography>

                  <TextField
                    fullWidth
                    name="abhaNumber"
                    placeholder="00-0000-0000-0000"
                    value={formik.values.abhaNumber}
                    onChange={handleAbhaChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.abhaNumber && Boolean(formik.errors.abhaNumber)}
                    helperText={formik.touched.abhaNumber && formik.errors.abhaNumber}
                    inputProps={{ maxLength: 17 }}
                  />

                  <Box sx={{ textAlign: "right", pr: 1, mt: "4px" }}>
                    <Link
                      component="button"
                      type="button"
                      onClick={handleForgotAbhaNumber}
                      sx={{ fontSize: "13px", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                    >
                      Forgot ABHA Number?
                    </Link>
                  </Box>
                </Box>

                <Typography sx={{ fontWeight: 600, fontSize: "15px", pl: 1, color: "text.secondary", mb: 1 }}>
                  Validate using
                </Typography>

                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                  <Box
                    onClick={() => formik.setFieldValue("otpMethod", "aadhaar")}
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: "10px",
                      p: 2,
                      textAlign: "center",
                      cursor: "pointer",
                      bgcolor: formik.values.otpMethod === "aadhaar" ? "#e8f5e9" : "white",
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
                    <Typography sx={{ fontWeight: 600, fontSize: "15px", pl: 1, color: "text.secondary" }}>
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
                    <Typography sx={{ fontWeight: 600, fontSize: "15px", pl: 1, color: "text.secondary" }}>
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
              </>
            )}

            {/* -------- STEP 2 -------- */}
            {activeStep === 1 && (
              <Box sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 600, fontSize: "15px", pl: 1, color: "text.secondary", mb: 1 }}>
                  Choose the ABHA address you want to log in with <span style={{ color: "red" }}>*</span>
                </Typography>

                <RadioGroup
                  name="abhaAddress"
                  value={formik.values.abhaAddress}
                  onChange={(e) => formik.setFieldValue("abhaAddress", e.target.value)}
                >
                  {abhaAddressList.map((item, index) => (
                    <FormControlLabel key={index} value={item} control={<Radio />} label={item} sx={{ ml: 1 }} />
                  ))}
                </RadioGroup>

                {formik.touched.abhaAddress && formik.errors.abhaAddress && (
                  <Typography sx={{ color: "error.main", fontSize: "0.75rem", mt: 1, ml: 2 }}>
                    {formik.errors.abhaAddress}
                  </Typography>
                )}
              </Box>
            )}

            {/* Buttons */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 3 }}>
              {activeStep !== 0 && (
                <Button variant="text" onClick={handleBack}>
                  Back
                </Button>
              )}

              <Button variant="contained" type="submit">
                {activeStep === steps.length - 1 ? "Submit" : "Generate OTP"}
              </Button>
            </Box>
          </Box>
        </Container>
      </CustomCard>
    </Layout>
  );
}
