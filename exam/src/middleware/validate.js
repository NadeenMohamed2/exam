import { appError } from "../utils/appError.js";

export const validate = (schema) => {
  return (req, res, next) => {
    let { error } = schema.validate(
      { ...req.body, ...req.params, ...req.query },
      { abortEarly: false }
    );
    if (!error) {
      next();
    } else {
      let errMsg = error.details.map((err) => err.message);
      next(new appError(errMsg, 401));
    }
  };
};