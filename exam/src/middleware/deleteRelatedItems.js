import { Application } from "../../dbConnection/models/application.model.js";
import { Company } from "../../dbConnection/models/company.model.js";
import { Job } from "../../dbConnection/models/job.model.js";
import { User } from "../../dbConnection/models/user.model.js";


export const deleteRelatedUserItems = async (req, res, next) => {
    let user = await User.findById(req.params.id)
    await Application.deleteMany({ user: user._id });
    if (user.role === 'Company_HR') {
        const companies = await Company.find({ companyHR: user._id });
        for (const company of companies) {
            const jobs = await Job.find({ addedBy: company._id });
            for (const job of jobs) {
                await Application.deleteMany({ jobId: job._id });
            }
            await Job.deleteMany({ addedBy: company._id });
        }
        await Company.deleteMany({ companyHR: user._id });
    }
    next()
}

export const deleteRelatedCompanyItems = async (req, res, next) => {
    let company = await Company.findOneAndDelete({ _id: req.params.id })
    const jobs = await Job.find({ addedBy: company._id });
    for (const job of jobs) {
        await Application.deleteMany({ jobId: job._id });
    }
    await Job.deleteMany({ addedBy: company._id });
    next()
}

export const deleteRelatedJobItems = async (req, res, next) => {
    let job = await Job.findOneAndDelete({ _id: req.params.id })
    await Application.deleteMany({ jobId: job._id });
    next()
}
