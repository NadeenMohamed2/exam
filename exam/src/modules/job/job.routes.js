import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { validate } from "../../middleware/validate.js";
import { jobValidation, updateJobValidation } from "./job.validation.js";
import { addJob, applyToJob, deleteJob, getAllJobs, getallCompanyJobs, getjobsByFilters, updateJob } from "./job.controller.js";
import { filter } from "../../middleware/filter.js";
import { upload } from "../../fileUploade/fileUpload.js";
import { applicationValidation } from "../application/application.validation.js";
import { deleteRelatedJobItems } from "../../middleware/deleteRelatedItems.js";


const jobRouter = Router()

// 1-Add job 
jobRouter.post('/', verifyToken, validate(jobValidation), addJob)

// 2-Update job
jobRouter.put('/:id', verifyToken, validate(updateJobValidation), updateJob)

// 3-Delete job
jobRouter.delete('/:id', verifyToken, deleteRelatedJobItems, deleteJob)

// 4-Get all Jobs with their company’s information
jobRouter.get('/', verifyToken, getAllJobs)

// 5-Get all Jobs for a specific company 
jobRouter.get('/company', verifyToken, getallCompanyJobs)

// 6-Get all Jobs that match the following filters 
jobRouter.get('/filter', verifyToken, filter, getjobsByFilters)

// 7-Apply to Job
jobRouter.post('/apply', verifyToken, upload.single('userResme'), validate(applicationValidation), applyToJob)

export default jobRouter