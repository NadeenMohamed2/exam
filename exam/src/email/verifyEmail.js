import jwt from "jsonwebtoken"
import { User } from "../../dbConnection/models/user.model.js"
import { appError } from "../utils/appError.js"



export const vreifyEmail = async (req, res, next) => {
    jwt.verify(req.params.token, "verifyToken", async (err, decoded) => {
        if (err) return next(new appError(err, 401))
        await User.findOneAndUpdate({ email: decoded.email }, { confirmEmail: true })
        res.json({ message: "success" })
    })
}