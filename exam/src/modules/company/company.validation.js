import joi from 'joi';


export const companyValidation = joi.object({
    companyName: joi.string().required(),
    description: joi.string().required(),
    industry: joi.string().required(),
    address: joi.string().required(),
    numberOfEmployees: joi.string().pattern(/^\d+-\d+$/).required(),
    companyEmail: joi.string().email().required(),
});

export const updateCompanyValidation = joi.object({
    companyName: joi.string(),
    description: joi.string(),
    industry: joi.string(),
    address: joi.string(),
    numberOfEmployees: joi.string().pattern(/^\d+-\d+$/),
    companyEmail: joi.string().email(),
    id: joi.string()
});