import jwt from 'jsonwebtoken';
import { appError } from '../utils/appError.js';


export const verifyToken = async (req, res, next) => {
    let { token } = req.headers
    jwt.verify(token, process.env.JWT_SECRITE, async (err, decoded) => {
        if (err) return next(new appError(`invalid token ${err}`, 401))
        req.logedUser = decoded
        next()
    })
}