import * as Yup from 'yup';
import dayjs from 'dayjs';

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

  // second form 
  // registration:'',
};












// Organization Validation Schema
export const organizationValidationSchema = Yup.object({
  organizationName: Yup.string()
    .min(2, 'Organization name must be at least 2 characters')
    .max(100, 'Organization name must be less than 100 characters')
    .matches(/^[A-Za-z0-9\s&.,'-]+$/, 'Invalid characters in organization name')
    .required('Organization name is required'),

  registrationNo: Yup.string()
    .min(5, 'Registration number must be at least 5 characters')
    .max(50, 'Registration number must be less than 50 characters')
    .required('Registration number is required'),

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
    .max(200, 'Address must be less than 200 characters')
    .required('Address 1 is required'),

  address2: Yup.string()
    .max(200, 'Address must be less than 200 characters'),

  contactPersonName: Yup.string()
    .min(2, 'Contact person name must be at least 2 characters')
    .max(50, 'Contact person name must be less than 50 characters')
    .matches(/^[A-Za-z\s]+$/, 'Only alphabets and spaces are allowed')
    .required('Contact person name is required'),

  phoneNumber: Yup.string()
    .matches(/^\d{5}-\d{5}$/, 'Please enter a valid mobile number')
    .required('Phone number is required'),

  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email address is required'),

  organizationType1: Yup.string()
    .oneOf(['Private', 'Government'], 'Please select a valid organization type')
    .required('Organization type is required'),

  organizationType2: Yup.string()
    .oneOf(['ForProfit', 'NonProfit'], 'Please select a valid profit type')
    .required('Profit type is required'),
});

// Organization Initial Values
export const organizationInitialValues = {
  organizationName: '',
  registrationNo: '',
  zipCode: '',
  city: '',
  state: '',
  country: '',
  address1: '',
  address2: '',
  contactPersonName: '',
  phoneNumber: '',
  email: '',
  organizationType1: '',
  organizationType2: '',
};









export const qualificationValidationSchema = Yup.object({
  qualification: Yup.string()
    .min(2, 'Qualification must be at least 2 characters')
    .max(100, 'Qualification must be less than 100 characters')
    .matches(/^[A-Za-z0-9\s.,'-]+$/, 'Invalid characters in qualification')
    .required('Qualification is required'),

  institute: Yup.string()
    .min(2, 'Institute name must be at least 2 characters')
    .max(150, 'Institute name must be less than 150 characters')
    .matches(/^[A-Za-z0-9\s.,&'-]+$/, 'Invalid characters in institute name')
    .required('Institute/Organization is required'),

  completionDate: Yup.mixed()
    .test('is-valid-date', 'Please select a valid date', (value) => {
      return dayjs.isDayjs(value) && value.isValid();
    })
    .test('not-future', 'Completion date cannot be in the future', (value) => {
      if (!dayjs.isDayjs(value)) return false;
      return value.isBefore(dayjs()) || value.isSame(dayjs(), 'day');
    })
    .required('Completion date is required'),
});

// Qualification Initial Values
export const qualificationInitialValues = {
  qualification: '',
  institute: '',
  completionDate: dayjs(),
};














// ===== COMMUNITY WORKER VALIDATION SCHEMAS =====

export const communityWorkerValidationSchemas = [
  // Step 0 - Profile
  Yup.object({
    title: Yup.string().required('Title is required'),
    firstName: Yup.string()
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name must be less than 50 characters')
      .matches(/^[A-Za-z]+$/, 'Only alphabets are allowed')
      .required('First name is required'),
    lastName: Yup.string()
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name must be less than 50 characters')
      .matches(/^[A-Za-z]+$/, 'Only alphabets are allowed')
      .required('Last name is required'),
    registration: Yup.string()
      .min(5, 'Registration number must be at least 5 characters')
      .max(50, 'Registration number must be less than 50 characters'),
    qualifications: Yup.array()
      .of(
        Yup.object({
          qualification: Yup.string().required(),
          institute: Yup.string().required(),
          completionDate: Yup.string().required(),
        })
      )
      .min(1, 'At least one qualification is required'),
    isWorking: Yup.boolean(),
    organizations: Yup.array().when('isWorking', {
      is: true,
      then: (schema) => schema.min(1, 'At least one organization is required when working'),
      otherwise: (schema) => schema,
    }),
  }),

  // Step 1 - Gender
  Yup.object({
    gender: Yup.string()
      .oneOf(['male', 'female', 'LGBTQIA+', 'prefer_not_to_say'], 'Please select a valid gender')
      .required('Gender is required'),
    isPregnant: Yup.boolean(),
  }),

  // Step 2 - Age
  Yup.object({
    birthdate: Yup.date()
      .max(new Date(), 'Birthdate cannot be in the future')
      .required('Birthdate is required'),
    age: Yup.number()
      .min(18, 'Community worker must be at least 18 years old')
      .max(125, 'Please enter a valid age')
      .required('Age is required'),
  }),

  // Step 3 - Address
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
];

// Community Worker Initial Values
export const communityWorkerInitialValues = {
  title: 'Mr.',
  firstName: '',
  lastName: '',
  registration: '',
  qualifications: [],
  isWorking: false,
  organizations: [],
  gender: '',
  isPregnant: false,
  birthdate: '',
  age: '',
  addressType: 'Register',
  zipCode: '',
  city: '',
  state: '',
  country: '',
  address1: '',
  address2: '',
};















