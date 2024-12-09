import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { validate } from "../../middleware/validate.js";
import { companyValidation, updateCompanyValidation } from "./company.validation.js";
import { addCompany, deleteCompany, getAllApplicationForJob, getAllCompany, searchForCompany, updateCompany } from "./company.controller.js";
import { companyExists } from "../../middleware/companyExists.js";
import { deleteRelatedCompanyItems } from "../../middleware/deleteRelatedItems.js";


const companyRouter = Router()

// 1-Add company 
companyRouter.post('/', companyExists, verifyToken, validate(companyValidation), addCompany)

// 2-Update company data
companyRouter.put('/:id', companyExists, verifyToken, validate(updateCompanyValidation), updateCompany)

// 3-Delete company data
companyRouter.delete('/:id', verifyToken, deleteRelatedCompanyItems, deleteCompany)

// 4-Get company data
companyRouter.get('/:id', verifyToken, getAllCompany)

// 5-Search for a company with a name. 
companyRouter.post('/companySearch/search', verifyToken, searchForCompany)

// 6-Get all applications for specific Jobs
companyRouter.get('/jobs/Applications', verifyToken, getAllApplicationForJob)



export default companyRouter