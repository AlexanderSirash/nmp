import { autoSuggestUsersSchema, userSchema } from './user.js';
import statusCodes from '../../statusCodes.js';

export function userValidation(req, res, next) {
  const validationResult = userSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(statusCodes.BAD_REQUEST).send(validationResult.error.details);
  }
  next();
}

export function autoSuggestUsersValidation(req, res, next) {
  const validationResult = autoSuggestUsersSchema.validate(req.query);
  if (validationResult.error) {
    return res.status(statusCodes.BAD_REQUEST).send(validationResult.error.details);
  }
  next();
}
