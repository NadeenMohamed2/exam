import { catchError } from '../../middleware/catchError.js';
import { appError } from '../../utils/appError.js';
import { Company } from '../../../dbConnection/models/company.model.js';
import { Job } from '../../../dbConnection/models/job.model.js';
import { Application } from '../../../dbConnection/models/application.model.js';


// 1-Add company 
const addCompany = catchError(async (req, res, next) => {
    if (req.logedUser.role !== "Company_HR") return next(new appError('you must be company HR', 401));
    let company = await Company.insertMany({ ...req.body, companyHR: req.logedUser.userId })
    res.status(201).json({ message: "success", company })
})

// 2-Update company data
const updateCompany = catchError(async (req, res, next) => {
    if (req.logedUser.role !== "Company_HR") return next(new appError('you must be company HR', 401));
    let company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!company) return next(new appError('Company not found', 404));
    res.status(201).json({ message: "success", company })
})

// 3-Delete company data
const deleteCompany = catchError(async (req, res, next) => {
    if (req.logedUser.role !== "Company_HR") return next(new appError('you must be company HR', 401));
    let company = await Company.findOneAndDelete({ _id: req.params.id })

    if (!company) return next(new appError(`company not found`, 404))
    res.status(200).json({ message: "success", company })
})

// 4-Get company data
const getAllCompany = catchError(async (req, res) => {
    if (req.logedUser.role !== "Company_HR") return next(new appError('you must be company HR', 401));
    let relatedJobs = await Job.find({ addedBy: req.params.id })

    let company = await Company.findById(req.params.id)
    if (!company) return next(new appError(`company not found`, 404))

    res.status(200).json({ message: "success", company, relatedJobs })
})

// 5-Search for a company with a name. 
const searchForCompany = catchError(async (req, res, next) => {
    if (req.logedUser.role !== "Company_HR" && req.logedUser.role !== "User") return next(new appError('you must be company HR or User', 401));

    let company = await Company.findOne({ companyName: req.body.companyName })
    if (!company) return next(new appError(`company not found`, 404))
    res.status(200).json({ message: "success", company })
})

// 6-Get all applications for specific Jobs
const getAllApplicationForJob = catchError(async (req, res, next) => {
    if (req.logedUser.role !== "Company_HR") return next(new appError('you must be company HR', 401));

    const companyHRId = req.logedUser.userId;
    const company = await Company.findOne({ companyHR: companyHRId });

    const jobs = await Job.find({ addedBy: company._id });
    if (jobs.length == 0) return next(new appError('No jobs related to this company HR', 404));
    const jobIds = jobs.map(job => job._id);

    const applications = await Application.find({ jobId: { $in: jobIds } }).populate('user', 'username email mobileNumber DOB');
    res.status(200).json({ message: "success", applications })
})


export {
    addCompany,
    updateCompany,
    deleteCompany,
    getAllCompany,
    searchForCompany,
    getAllApplicationForJob
}