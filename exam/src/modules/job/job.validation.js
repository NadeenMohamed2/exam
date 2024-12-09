import joi from 'joi';


export const jobValidation = joi.object({
  jobTitle: joi.string().required(),
  jobLocation: joi.string().valid('onsite', 'remotely', 'hybrid').required(),
  workingTime: joi.string().valid('part-time', 'full-time').required(),
  seniorityLevel: joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO').required(),
  jobDescription: joi.string().required(),
  technicalSkills: joi.array().items(joi.string()).required(),
  softSkills: joi.array().items(joi.string()).required(),
  addedBy: joi.string().required(),
});

export const updateJobValidation = joi.object({
  jobTitle: joi.string(),
  jobLocation: joi.string().valid('onsite', 'remotely', 'hybrid'),
  workingTime: joi.string().valid('part-time', 'full-time'),
  seniorityLevel: joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
  jobDescription: joi.string(),
  technicalSkills: joi.array().items(joi.string()),
  softSkills: joi.array().items(joi.string()),
  id: joi.string()
});