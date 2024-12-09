import { User } from "../../dbConnection/models/user.model.js";
import { appError } from "../utils/appError.js";
import { catchError } from "./catchError.js";


export const otpVerify = catchError(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new appError("User not found", 401));

    if (user.otpVerified == true)
        return next(new appError("You are verified", 409));

    if (user.otp !== req.body.otp) return next(new appError("invalid otp"), 401);

    if (user.otpExpires < new Date()) {
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const newOtpExpires = new Date(Date.now() + 3 * 60000);

        user.otp = newOtp;
        user.otpExpires = newOtpExpires;
        await user.save();

        sendEmails(email, newOtp);
        return next(new appError("otp expired please insert the new one"), 401);
    }

    user.otpVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();
    res.status(200).json({ message: "Email verified" });
});