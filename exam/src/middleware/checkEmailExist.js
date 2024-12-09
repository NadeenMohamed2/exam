import bcrypt from 'bcrypt'
import { User } from '../../dbConnection/models/user.model.js'
import { appError } from '../utils/appError.js'


export const checkEmailExist = async (req, res, next) => {
    let findEmail = await User.findOne({ email: req.body.email })
    if (findEmail) return next(new appError('email already exists', 409))
    req.body.password = bcrypt.hashSync(req.body.password, 8)

    let findMobile = await User.findOne({ mobileNumber: req.body.mobileNumber })
    if (findMobile) return next(new appError("Mobile number already exists", 400))
    next()
}

export const checkUpdateDateExist = async (req, res, next) => {
    let user = await User.findById(req.params.id)
    if (user.mobileNumber !== req.body.mobileNumber) {
        const mobileNumberExists = await User.findOne({ mobileNumber: req.body.mobileNumber });
        if (mobileNumberExists) return next(new appError("Mobile number already exists", 400))
    }
    if (user.email !== req.body.email) {
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) return next(new appError("email already exists", 400))
    }

    next()
}