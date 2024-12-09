import joi from 'joi';


export const signupValidation = joi.object({
    firstName: joi.string().min(3).max(20).required(),
    lastName: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(/^[A-Z][a-zA-Z0-9]{8,40}$/).required(),
    recoveryEmail: joi.string().email().required(),
    DOB: joi.string().pattern(/^(19|20)\d\d-([1-9]|[12][0-9]|3[01])-([1-9]|1[012])$$/).required(),
    mobileNumber: joi.string().pattern(/^01[0125][0-9]{8}$/).required(),
    role: joi.string().valid('User', 'Company_HR').required(),
});

export const signinValidation = joi.object({
    email: joi.string().email(),
    mobileNumber: joi.string().pattern(/^01[0125][0-9]{8}$/),
    password: joi.string().pattern(/^[A-Z][a-zA-Z0-9]{8,40}$/).required(),
});

export const updateUserValidation = joi.object({
    firstName: joi.string().min(3).max(20),
    lastName: joi.string().min(3).max(20),
    email: joi.string().email(),
    recoveryEmail: joi.string().email(),
    DOB: joi.string().pattern(/^(19|20)\d\d-([1-9]|[12][0-9]|3[01])-([1-9]|1[012])$$/),
    mobileNumber: joi.string().pattern(/^01[0125][0-9]{8}$/),
    role: joi.string().valid('User', 'Company_HR'),
    id: joi.string()
});