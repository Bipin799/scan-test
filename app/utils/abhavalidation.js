import * as Yup from "yup";

// Initial Values
export const initialValues = {
  islinked: false,
  mobile: "",
  termsAccepted: false,
  termsAccepted2: false,
  gender: "",
  zipCode: "",
  city: "",
  state: "",
  dob: "",
  firstName: "",
  middleName: "",
  lastName: "",
  ABHAaddress: "",
  createPassword: "",
  confirmPassword: ""
};

// Validation Schema
export const validationSchema = Yup.object().shape({
  // Step 1 Validations
  mobile: Yup.string()
    // .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
    .matches(/^\d{5}-\d{5}$/, 'Please enter a valid mobile number')
    .required("Mobile number is required"),
  termsAccepted: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),

  // Step 2 Validations
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "First name should only contain letters")
    .required("First name is required"),
  // middleName: Yup.string()
  //   .min(2, "Middle name must be at least 2 characters")
  //   .max(50, "Middle name must not exceed 50 characters")
  //   .matches(/^[a-zA-Z\s]*$/, "Middle name should only contain letters"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Last name should only contain letters")
    .required("Last name is required"),
  dob: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future")
    .min(new Date(1900, 0, 1), "Date of birth is invalid")
    .required("Date of birth is required")
    .test("age", "You must be at least 18 years old", function(value) {
      const cutoff = new Date();
      cutoff.setFullYear(cutoff.getFullYear() - 18);
      return value <= cutoff;
    }),
  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Please select a valid gender")
    .required("Gender is required"),
  zipCode: Yup.string()
    .matches(/^[0-9]{6}$/, "ZIP code must be exactly 6 digits")
    .required("ZIP code is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  termsAccepted2: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),

  // Step 3 Validations
  ABHAaddress: Yup.string()
    .min(4, "ABHA address must be at least 4 characters")
    .max(50, "ABHA address must not exceed 50 characters")
    .matches(/^[a-zA-Z0-9._-]+$/, "ABHA address can only contain letters, numbers, dots, hyphens and underscores")
    .required("ABHA address is required"),
  createPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must not exceed 20 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
  confirmPassword: Yup.string()
    .when("createPassword", {
      is: (val) => val && val.length > 0,
      then: (schema) => schema
        .oneOf([Yup.ref("createPassword")], "Passwords must match")
        .required("Please confirm your password")
    })
});

// Step-specific validation
export const getStepValidation = (step) => {
  switch (step) {
    case 0:
      return Yup.object().shape({
        mobile: validationSchema.fields.mobile,
        termsAccepted: validationSchema.fields.termsAccepted
      });
    case 1:
      return Yup.object().shape({
        firstName: validationSchema.fields.firstName,
        middleName: validationSchema.fields.middleName,
        lastName: validationSchema.fields.lastName,
        dob: validationSchema.fields.dob,
        gender: validationSchema.fields.gender,
        zipCode: validationSchema.fields.zipCode,
        city: validationSchema.fields.city,
        state: validationSchema.fields.state,
        termsAccepted2: validationSchema.fields.termsAccepted2
      });
    case 2:
      return Yup.object().shape({
        ABHAaddress: validationSchema.fields.ABHAaddress,
        createPassword: validationSchema.fields.createPassword,
        confirmPassword: validationSchema.fields.confirmPassword
      });
    default:
      return Yup.object().shape({});
  }
};

// Generate ABHA Address Suggestions
export const generateABHASuggestions = (firstName, lastName, dob) => {
  if (!firstName || !lastName || !dob) return [];

  const firstNameClean = firstName.toLowerCase().replace(/\s/g, "");
  const lastNameClean = lastName.toLowerCase().replace(/\s/g, "");
  
  // Extract date parts
  const dobDate = new Date(dob);
  const year = dobDate.getFullYear().toString().slice(-2);
  const month = String(dobDate.getMonth() + 1).padStart(2, "0");
  const day = String(dobDate.getDate()).padStart(2, "0");

  const suggestions = [
    `${firstNameClean}.${lastNameClean}`,
    `${firstNameClean}${lastNameClean}${year}`,
    `${firstNameClean}_${lastNameClean}${day}${month}`,
    `${lastNameClean}.${firstNameClean}${year}`,
    `${firstNameClean}${day}${month}${year}`
  ];

  return suggestions.slice(0, 3);
};