import Joi from 'joi';
import PasswordComplexity from 'joi-password-complexity';
import { statusCodes } from '../../config/index.js';

const minAge = 4;
const maxAge = 130;
const minLimit = 1;

const complexityOptions = {
  min: 5,
  max: 250,
  numeric: 1,
  lowerCase: 1,
};

const userSchema = Joi.object().keys({
  login: Joi.string().required(),
  password: PasswordComplexity(complexityOptions).required(),
  age: Joi.number().min(minAge).max(maxAge).required(),
});

const autoSuggestUsersSchema = Joi.object().keys({
  loginSubstring: Joi.string().required(),
  limit: Joi.number().min(minLimit).required(),
});

export function userValidation(req, res, next) {
  const validationResult = userSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(statusCodes.BAD_REQUEST).json(validationResult.error.details);
  }
  next();
}

export function autoSuggestUsersValidation(req, res, next) {
  const validationResult = autoSuggestUsersSchema.validate(req.query);
  if (validationResult.error) {
    return res.status(statusCodes.BAD_REQUEST).json(validationResult.error.details);
  }
  next();
}
