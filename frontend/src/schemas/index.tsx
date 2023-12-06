import * as yup from 'yup';

export const userSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required(),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  password: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum')
    .max(20, 'Password is too long - should be 20 chars maximum')
    .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 'Please Use Strong Password with max 20 character length')
    .required('Password is required'),
});

export const signinSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required(),

  password: yup
    .string()
    .min(6, 'Password is too short - should be 6 chars minimum')
    .required('Password is required')
});

export const verificationSchema = yup.object().shape({
  verification: yup
    .string()
    .required('Please enter the OPT')
    .min(5, 'OTP is 5 numbers')
});
