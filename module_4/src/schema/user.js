import Joi from 'joi';
import PasswordComplexity from 'joi-password-complexity';

const minAge = 4;
const maxAge = 130;
const minLimit = 1;

const complexityOptions = {
  min: 5,
  max: 250,
  numeric: 1,
  lowerCase: 1,
};

export const userSchema = Joi.object().keys({
  login: Joi.string().required(),
  password: PasswordComplexity(complexityOptions).required(),
  age: Joi.number().min(minAge).max(maxAge).required(),
});

export const autoSuggestUsersSchema = Joi.object().keys({
  loginSubstring: Joi.string().required(),
  limit: Joi.number().min(minLimit).required(),
});
