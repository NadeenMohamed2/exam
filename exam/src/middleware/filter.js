

export const filter = (req, res, next) => {
    const { workingTime, jobLocation, seniorityLevel, jobTitle, technicalSkills } = req.query;
    let filter = {};

    if (workingTime) {
        filter.workingTime = workingTime;
    }

    if (jobLocation) {
        filter.jobLocation = jobLocation;
    }

    if (seniorityLevel) {
        filter.seniorityLevel = seniorityLevel;
    }

    if (jobTitle) {
        filter.jobTitle = { $regex: jobTitle, $options: 'i' };
    }

    if (technicalSkills) {
        filter.technicalSkills = { $in: technicalSkills.split(',') };
    }

    req.filter = filter
    next()
}