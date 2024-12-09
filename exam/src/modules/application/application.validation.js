import joi from 'joi';


export const applicationValidation = joi.object({
    jobId: joi.string().required(),
    userTechSkills: joi.array().items(joi.string()).required(),
    userSoftSkills: joi.array().items(joi.string()).required(),
    userResume: joi.string(),
});