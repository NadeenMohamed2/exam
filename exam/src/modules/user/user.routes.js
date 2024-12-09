import { Router } from "express";
import { signup, deleteUser, getUserAccountData, updateUser, signin, getAnotherUserData, updatePassword, forgetPassword, resetPassword, getRecoveryEmailUsers } from "./user.controller.js";
import { checkEmailExist, checkUpdateDateExist } from './../../middleware/checkEmailExist.js';
import { validate } from "../../middleware/validate.js";
import { signinValidation, signupValidation, updateUserValidation } from "./user.validation.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { deleteRelatedUserItems } from "../../middleware/deleteRelatedItems.js";


const userRouter = Router()

// 1-signup
userRouter.post('/signup', validate(signupValidation), checkEmailExist, signup)

// 2-signin
userRouter.post('/signin', validate(signinValidation), signin)

// 3-update account
userRouter.put('/:id', checkUpdateDateExist, verifyToken, validate(updateUserValidation), updateUser)

// 4-delete user
userRouter.delete('/:id', verifyToken, deleteRelatedUserItems, deleteUser)

// 5-Get user account data 
userRouter.get('/', verifyToken, getUserAccountData)

// 6-Get profile data for another user 
userRouter.get('/:id', getAnotherUserData)

// 7-Update password 
userRouter.post('/:id', verifyToken, updatePassword)

// 8-Forget password
userRouter.post('/password/forgetPassword', forgetPassword)
userRouter.post('/password/resetPassword', resetPassword)

// 9-Get all accounts associated to a specific recovery Email
userRouter.get('/recoveryEmail/getRecoveryEmailUsers', getRecoveryEmailUsers)

export default userRouter