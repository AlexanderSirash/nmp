import Joi from 'joi';
import PasswordComplexity from 'joi-password-complexity';

const complexityOptions = {
  min: 5,
  max: 250,
  numeric: 1,
  lowerCase: 1,
};

export const loginSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: PasswordComplexity(complexityOptions).required(),
});
