import * as yup from 'yup';

const contactFormValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Name is required')
      .max(100, 'Name must be less than 100 characters'),
    email: yup
      .string()
      .required('Email is required')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid email address'
      )
      .max(100, 'Email must be less than 100 characters'),
    subject: yup
      .string()
      .required('Subject is required')
      .max(100, 'Subject must be less than 100 characters'),
    message: yup
      .string()
      .required('Message is required')
      .max(800, 'Message must be less than 800 characters')
  });

export default contactFormValidationSchema;