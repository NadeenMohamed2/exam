import { Company } from "../../dbConnection/models/company.model.js";
import { appError } from "../utils/appError.js";
import { catchError } from "./catchError.js";


export const companyExists = catchError(async (req, res, next) => {
    let companyExists = await Company.findOne({ companyEmail: req.body.companyEmail });
    if (companyExists) return next(new appError('Company email already exists', 401));

    let companyNameExists = await Company.findOne({ companyName: req.body.companyName });
    if (companyNameExists) return next(new appError('Company name already exists', 401));
    next()
})
