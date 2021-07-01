import Joi from 'joi';
import PasswordComplexity from 'joi-password-complexity';
import { statusCodes } from '../../config/index.js';

const complexityOptions = {
  min: 5,
  max: 250,
  numeric: 1,
  lowerCase: 1,
};

const loginSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: PasswordComplexity(complexityOptions).required(),
});

export function loginValidation(req, res, next) {
  const validationResult = loginSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(statusCodes.BAD_REQUEST).json(validationResult.error.details);
  }
  next();
}
