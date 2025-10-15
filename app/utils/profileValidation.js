import * as Yup from 'yup';

export const validationSchemas = [
  
  // Step 0 - Personal Info
  Yup.object({
    title: Yup.string().required('Title is required'),
    phoneNumber: Yup.string()
      // .matches(/^[0-9]{10}$/, 'Please enter a valid mobile number')
      .matches(/^\d{5}-\d{5}$/, 'Please enter a valid mobile number')
      .required('Please Enter Phone Number'),
    firstName: Yup.string()
      .min(2, 'First name must be at least 2 characters')
      .max(20, 'First name must be less than 50 characters')
      .matches(/^[A-Za-z]+$/, 'Only alphabets are allowed')
      .required('First name is required'),
    lastName: Yup.string()
      .min(2, 'Last name must be at least 2 characters')
      .max(20, 'Last name must be less than 50 characters')
      .matches(/^[A-Za-z]+$/, 'Only alphabets are allowed')
      .required('Last name is required'),
  }),

  // Step 1 - Address
  Yup.object({
    addressType: Yup.string().required('Address type is required'),

    
    zipCode: Yup.string()
      .matches(/^[0-9]{6}$/, 'Invalid Zipcode')
      .required('ZIP code is required'),





    city: Yup.string()
      .min(2, 'City must be at least 2 characters')
      .required('City is required'),
    state: Yup.string()
      .min(2, 'State must be at least 2 characters')
      .required('State is required'),
    country: Yup.string()
      .min(2, 'Country must be at least 2 characters')
      .required('Country is required'),

    
    address1: Yup.string()
      .min(5, 'Address must be at least 5 characters')
      .required('Address 1 is required'),
    address2: Yup.string(),
  }),

  // Step 2 - Gender
  Yup.object({
    gender: Yup.string()
      .oneOf(['male', 'female', 'LGBTQIA+','prefer_not_to_say'], 'Please select a valid gender')
      .required('Gender is required'),
  }),

  // Step 3 - Age
  Yup.object({
    birthdate: Yup.date()
      .max(new Date(), 'Birthdate cannot be in the future')
      .required('Birthdate is required'),
    age: Yup.number()
      .min(0, 'Age must be positive')
      .max(125, 'Please enter a valid age')
      .required('Age is required'),
  }),

  // Step 4 - Weight
  Yup.object({
    weight: Yup.number()
      .transform((value) => (isNaN(value) ? 0 : value))
      .when('weightUnit', ([weightUnit], schema) => {
        return weightUnit === 'kg'
          ? schema.min(1, 'Weight must be at least 1 kg/lb').max(300, 'Max 300 kg or 661 lbs allowed')
          : schema.min(1, 'Weight must be at least 1 kg/lb').max(661, 'Max 661 lbs or 300 kg allowed');      
      })
    .required('Weight is required'),
    weightUnit: Yup.string().oneOf(['kg', 'lbs']).required(),
    
  }),

  // Step 5 - Height
  Yup.object({
    height: Yup.number()
      .transform((value) => (isNaN(value) ? 0 : value))
      .when('heightUnit', ([heightUnit], schema) => {
        return heightUnit === 'cm'
          ? schema.min(1, 'Height must be at least 1 cm/inch').max(300, 'Max 300 cm or 118 inches allowed')
          : schema.min(1, 'Height must be at least 1 inch/cm').max(118, 'Max 118 inches  or 300 cm allowed');
      })
      .required('Height is required'),
    heightUnit: Yup.string().oneOf(['cm', 'inch']).required(),
  }),

  // Step 6 - Blood Group
  Yup.object({
    bloodGroup: Yup.string()
      .oneOf(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'unknown'], 'Please select a valid blood group')
      .required('Blood group is required'),
  }),
];

 export const initialValues = {
  title: 'Mr.',
  phoneNumber: '',
  firstName: '',
  lastName: '',
  isMarried: false,
  hasDiabetes: false,
  hasHypertension: false,
  isPregnant: false, 
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
  weight: '0',
  heightUnit: 'cm',
  height: '0',
  bloodGroup: '',
};

