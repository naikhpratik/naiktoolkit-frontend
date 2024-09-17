import * as yup from 'yup';

export const loginValidations = yup.object({
  email: yup.string()
    .email('Invalid email')
    .required('Email is required')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/,"Must be a valid email!")
    .max(255, 'Email must not exceed 255 characters'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase letter')
    .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase letter')
    .matches(/^(?=.*\d)/, 'Must contain at least one number')
    .matches(/^(?=.*[@$!%*?&#])/, 'Must contain at least one special character (@$!%*?&#)'),
  name: yup.string()
    .when('$isLogin', {
      is: false,
      then: (schema) => schema
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must not exceed 50 characters')
        .matches(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),
    }),
}).required();
