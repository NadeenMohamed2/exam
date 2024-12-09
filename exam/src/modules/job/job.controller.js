import { catchError } from '../../middleware/catchError.js';
import { appError } from '../../utils/appError.js';
import { Job } from '../../../dbConnection/models/job.model.js';
import { Company } from '../../../dbConnection/models/company.model.js';
import { Application } from './../../../dbConnection/models/application.model.js';


// 1-Add job
const addJob = catchError(async (req, res, next) => {
    if (req.logedUser.role !== "Company_HR") return next(new appError('you must be company HR', 401));
    let company = await Company.findById(req.body.addedBy)
    if (!company) return next(new appError('company not found', 404));
    let job = await Job.insertMany(req.body)
    res.status(201).json({ message: "success", job })
})

// 2-Update job
const updateJob = catchError(async (req, res, next) => {
    if (req.logedUser.role !== "Company_HR") return next(new appError('you must be company HR', 401));
    let job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!job) return next(new appError('job not found', 404));
    res.status(201).json({ message: "success", job })
})

// 3-Delete job
const deleteJob = catchError(async (req, res, next) => {
    if (req.logedUser.role !== "Company_HR") return next(new appError('you must be company HR', 401));
    let job = await Job.findOneAndDelete({ _id: req.params.id })
    if (!job) return next(new appError(`job not found`, 404))

    res.status(200).json({ message: "success", job })
})

// 4-Get all Jobs with their company’s information
const getAllJobs = catchError(async (req, res, next) => {
    if (req.logedUser.role !== "Company_HR" && req.logedUser.role !== "User") return next(new appError('you must be company HR or User', 401));

    const jobs = await Job.find().populate('addedBy', 'companyName description industry address companyEmail -_id');
    res.status(200).json({ message: "success", jobs })
})

// 5-Get all Jobs for a specific company 
const getallCompanyJobs = catchError(async (req, res, next) => {
    if (req.logedUser.role !== "Company_HR" && req.logedUser.role !== "User") return next(new appError('you must be company HR or User', 401));
    let { companyName } = req.query;

    let company = await Company.findOne({ companyName });

    if (!company) return next(new appError('Company not found', 404));
    let jobs = await Job.find({ addedBy: company._id }).populate('addedBy', 'companyName description industry address companyEmail -_id');

    res.status(200).json({ message: "success", jobs })
})

// 6-Get all Jobs that match the following filters 
const getjobsByFilters = catchError(async (req, res, next) => {
    if (req.logedUser.role !== "Company_HR" && req.logedUser.role !== "User") return next(new appError('you must be company HR or User', 401));
    let filter = req.filter
    const jobs = await Job.find(filter).populate('addedBy', 'companyName description industry address companyEmail -_id');
    res.status(200).json({ message: "success", jobs })
})

// 7-Apply to Job
const applyToJob = catchError(async (req, res, next) => {
    if (req.logedUser.role !== "User") return next(new appError('your role must be User', 401));
    const job = await Job.findById(req.body.jobId);
    if (!job) return next(new appError('Job not found', 404))

    req.body.userResume = req.file.filename
    const application = await Application.insertMany({ ...req.body, user: req.logedUser.userId })
    res.status(200).json({ message: "success", application })
})

export {
    addJob,
    updateJob,
    deleteJob,
    getAllJobs,
    getallCompanyJobs,
    getjobsByFilters,
    applyToJob
}