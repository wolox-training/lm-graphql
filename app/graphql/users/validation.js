const yup = require('yup'),
  { validationError } = require('../../errors'),
  { alphanumericRegex, emailRegex } = require('../../helpers/constants');

const userValidationSchema = yup.object().shape({
  password: yup
    .string()
    .required()
    .min(8, 'Password should be, at least, 8 characters long')
    .matches(alphanumericRegex, 'Password should only have alphanumeric characters'),
  email: yup
    .string()
    .required()
    .email('Invalid email')
    .matches(emailRegex, 'Email must be from Wolox domain')
});

exports.validateUser = user =>
  userValidationSchema.validate(user).catch(error => {
    throw validationError(error.message);
  });
