import { User } from "../../../dbConnection/models/user.model.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { sendEmails } from "../../email/email.js"
import { catchError } from "../../middleware/catchError.js"
import { appError } from "../../utils/appError.js"

// 1-signup
const signup = catchError(async (req, res, next) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 3 * 60000);

    const user = new User({ ...req.body, username: `${req.body.firstName} ${req.body.lastName}`, otp, otpExpires });
    await user.save();
    user.password = undefined;

    sendEmails(req.body.email, otp);

    res.status(201).json({ message: "Success", user });
});

// 2-signin
const signin = catchError(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email }) || await User.findOne({ mobileNumber: req.body.mobileNumber });

    if (!user || !bcrypt.compareSync(req.body.password, user.password))
        return next(new appError(`incorrect email or password`, 401))

    jwt.sign({ userId: user._id, username: user.username, role: user.role }, process.env.JWT_SECRITE, async (err, token) => {
        user.status = 'online'
        await user.save();
        res.json({ message: "success", token })
    })
})

// 3-update account
const updateUser = catchError(async (req, res, next) => {
    let user = await User.findById(req.params.id)
    if (!user) return next(new appError(`user not found`, 404))
    if (user.status != "online") return next(new appError(`you must be logedin`, 401))

    user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    user.username = user.firstName + " " + user.lastName
    await user.save();
    res.status(201).json({ message: "success", user })
})

// 4-delete user
const deleteUser = catchError(async (req, res, next) => {
    let user = await User.findById(req.params.id)
    if (!user) return next(new appError(`user not found`, 404))
    if (user.status != "online") return next(new appError(`you must be logedin`, 401))

    user = await User.findOneAndDelete({ _id: req.params.id })
    res.status(200).json({ message: "success", user })
})

// 5-Get user account data 
const getUserAccountData = catchError(async (req, res) => {
    let { username } = req.logedUser
    let user = await User.findOne({ username })
    if (!user) return next(new appError(`user not found`, 404))
    if (user.status != "online") return next(new appError(`you must be logedin`, 401))
    let { firstName, lastName, email, mobileNumber, DOB, role } = user
    res.status(200).json({ firstName, lastName, email, mobileNumber, DOB, role })
})

// 6-Get profile data for another user 
const getAnotherUserData = catchError(async (req, res) => {
    let user = await User.findOne({ _id: req.params.id })
    if (!user) return next(new appError(`user not found`, 404))
    let { username, mobileNumber, DOB, role } = user
    res.status(200).json({ username, mobileNumber, DOB, role })
})

// 7-Update password 
const updatePassword = catchError(async (req, res, next) => {
    const { password, newPassword } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return next(new appError(`user not found`, 404))

    if (!bcrypt.compareSync(password, user.password)) return next(new appError(`incorrect password`, 401))

    user.password = bcrypt.hashSync(newPassword, 8)
    await user.save();
    res.status(200).json({ message: "success", user })
})

// 8-Forget password
const forgetPassword = catchError(async (req, res, next) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 3 * 60000);

    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new appError(`email not found`, 404))

    user.otpVerified = false;
    user.otp = otp
    user.otpExpires = otpExpires
    await user.save();
    sendEmails(email, otp);
    res.status(201).json({ message: "success" })
});

const resetPassword = catchError(async (req, res, next) => {
    const { newPassword, email } = req.body;
    const user = await User.findOne({ email });

    user.password = bcrypt.hashSync(newPassword, 8)
    await user.save();

    res.status(201).json({ message: "Success", user });
});

// 9-Get all accounts associated to a specific recovery Email
const getRecoveryEmailUsers = catchError(async (req, res) => {
    let user = await User.find({ recoveryEmail: req.body.recoveryEmail })
    if (!user) return next(new appError(`recovery email not found`, 404))
    res.status(200).json({ message: "success", user })
})


export {
    signup,
    signin,
    updateUser,
    deleteUser,
    getUserAccountData,
    getAnotherUserData,
    updatePassword,
    forgetPassword,
    resetPassword,
    getRecoveryEmailUsers
}