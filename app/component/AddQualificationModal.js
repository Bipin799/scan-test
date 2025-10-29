// 'use client'

// import React, { useState, useEffect } from "react";
// import { Dialog, Button, TextField, Box, InputAdornment, IconButton } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import dayjs from "dayjs";
// import CustomCard from "./CustomCard";
// import CustomButton from "./CustomButton";

// const AddQualificationModal = ({ open, onClose, onSave }) => {
//   const [qualification, setQualification] = useState("");
//   const [institute, setInstitute] = useState("");
//   const [completionDate, setCompletionDate] = useState(dayjs());
//   const [calendarOpen, setCalendarOpen] = useState(false);

//   // Reset fields when modal opens
//   useEffect(() => {
//     if (open) {
//       setQualification("");
//       setInstitute("");
//       setCompletionDate(dayjs()); // pre-fill with today
//     }
//   }, [open]);

//   const handleSave = () => {
//     if (!qualification.trim() || !institute.trim() || !completionDate) return;

//     onSave({
//       qualification,
//       institute,
//       completionDate: completionDate.format("YYYY-MM-DD"),
//     });

//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <CustomCard title="Add Qualification" sx={{ p: 0 }}>
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
//           <TextField
//             label="Qualification"
//             value={qualification}
//             onChange={(e) => setQualification(e.target.value)}
//             fullWidth
//           />

//           <TextField
//             label="Institute/Organization"
//             value={institute}
//             onChange={(e) => setInstitute(e.target.value)}
//             fullWidth
//           />

//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               open={calendarOpen}
//               onClose={() => setCalendarOpen(false)}
//               value={completionDate}
//               onChange={(newValue) => setCompletionDate(newValue)}
//               maxDate={dayjs()}
//               enableAccessibleFieldDOMStructure={false}
//               slots={{
//                 textField: (params) => (
//                   <TextField
//                     {...params}
//                     fullWidth
//                     placeholder="DD/MM/YYYY"
//                     onClick={() => setCalendarOpen(true)}
//                     InputProps={{
//                       ...params.InputProps,
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <IconButton onClick={() => setCalendarOpen(true)}>
//                             <CalendarMonthIcon />
//                           </IconButton>
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 ),
//               }}
//               slotProps={{
//                 popper: {
//                   modifiers: [
//                     { name: "flip", enabled: false },
//                     {
//                       name: "preventOverflow",
//                       enabled: true,
//                       options: { altBoundary: true, rootBoundary: "viewport", tether: false },
//                     },
//                     { name: "offset", options: { offset: [0, 8] } },
//                   ],
//                   placement: "bottom-start",
//                 },
//               }}
//             />
//           </LocalizationProvider>
//         </Box>

//         {/* Buttons */}
//         <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 3 }}>
//           {/* <Button onClick={onClose} color="secondary">
//             Cancel
//           </Button> */}
//           {/* <Button onClick={handleSave} variant="contained" color="primary">
//             Save
//           </Button> */}

//            <CustomButton
//               type="button"
//               // onClick={() => handleNext(validateForm, values, setTouched)}
//               label="Save"
//           />

//         </Box>
//       </CustomCard>
//     </Dialog>
//   );
// };

// export default AddQualificationModal;









'use client'

import React, { useState } from "react";
import { Dialog, TextField, Box, InputAdornment, IconButton } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs from "dayjs";
import { Formik, Form } from "formik";
import CustomCard from "./CustomCard";
import CustomButton from "./CustomButton";
import { qualificationValidationSchema, qualificationInitialValues } from "./../utils/profileValidation";

const AddQualificationModal = ({ open, onClose, onSave, editData }) => {
  const [calendarOpen, setCalendarOpen] = useState(false);

  // const handleSubmit = (values, { setSubmitting, resetForm }) => {
  //   onSave({
  //     qualification: values.qualification,
  //     institute: values.institute,
  //     completionDate: values.completionDate.format("YYYY-MM-DD"),
  //   });
    
  //   resetForm();
  //   onClose();
  //   setSubmitting(false);
  // };

  const isEditMode = Boolean(editData);
  
  const initialValues = editData
    ? {
        qualification: editData.qualification,
        institute: editData.institute,
        completionDate: dayjs(editData.completionDate),
      }
    : qualificationInitialValues;

  const handleSubmit = (values, { setSubmitting, resetForm }) => {    
    const newData = {
      id: editData ? editData.id : Date.now(),
      qualification: values.qualification,
      institute: values.institute,
      completionDate: values.completionDate.format("YYYY-MM-DD"),
    };

    onSave(newData, isEditMode);
    resetForm();
    onClose();
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* <CustomCard title="Add Qualification" sx={{ p: 0 }}> */}
      <CustomCard title={isEditMode ? "Edit Qualification" : "Add Qualification"} sx={{ p: 0 }} onClose={onClose} >
        <Formik
          // initialValues={qualificationInitialValues}
          initialValues={initialValues}
          validationSchema={qualificationValidationSchema}
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
            setFieldTouched,
            isSubmitting,
          }) => (
            <Form>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                {/* Qualification Field */}
                <TextField
                  label="Qualification"
                  name="qualification"
                  value={values.qualification}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.qualification && Boolean(errors.qualification)}
                  helperText={touched.qualification && errors.qualification}
                  fullWidth
                />

                
                {/* Completion Date Picker */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    open={calendarOpen}
                    onClose={() => setCalendarOpen(false)}
                    value={values.completionDate}
                    onChange={(newValue) => {
                      setFieldValue("completionDate", newValue);
                      setFieldTouched("completionDate", true);
                    }}
                    maxDate={dayjs()}
                    enableAccessibleFieldDOMStructure={false}
                    slots={{
                      textField: (params) => (
                        <TextField
                          {...params}
                          fullWidth
                          name="completionDate"
                          placeholder="DD/MM/YYYY"
                          onClick={() => setCalendarOpen(true)}
                          onBlur={() => setFieldTouched("completionDate", true)}
                          error={touched.completionDate && Boolean(errors.completionDate)}
                          helperText={touched.completionDate && errors.completionDate}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setCalendarOpen(true)}>
                                  <CalendarMonthIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      ),
                    }}
                    slotProps={{
                      popper: {
                        modifiers: [
                          { name: "flip", enabled: false },
                          {
                            name: "preventOverflow",
                            enabled: true,
                            options: { altBoundary: true, rootBoundary: "viewport", tether: false },
                          },
                          { name: "offset", options: { offset: [0, 8] } },
                        ],
                        placement: "bottom-start",
                      },
                    }}
                  />
                </LocalizationProvider>

                {/* Institute Field */}
                <TextField
                  label="Institute/Organization"
                  name="institute"
                  value={values.institute}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.institute && Boolean(errors.institute)}
                  helperText={touched.institute && errors.institute}
                  fullWidth
                />
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 3 }}>
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

export default AddQualificationModal;