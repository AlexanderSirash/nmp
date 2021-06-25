import { autoSuggestUsersSchema, userSchema } from './user.js';
import { groupSchema } from './group.js';
import { addUsersToGroupSchema } from './addUsersToGroup.js';
import config from '../../config/index.js';

export function userValidation(req, res, next) {
  const validationResult = userSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(config.statusCodes.BAD_REQUEST).send(validationResult.error.details);
  }
  next();
}

export function autoSuggestUsersValidation(req, res, next) {
  const validationResult = autoSuggestUsersSchema.validate(req.query);
  if (validationResult.error) {
    return res.status(config.statusCodes.BAD_REQUEST).send(validationResult.error.details);
  }
  next();
}

export function groupValidation(req, res, next) {
  const validationResult = groupSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(config.statusCodes.BAD_REQUEST).send(validationResult.error.details);
  }
  next();
}

export function addUsersToGroupValidation(req, res, next) {
  const validationResult = addUsersToGroupSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(config.statusCodes.BAD_REQUEST).send(validationResult.error.details);
  }
  next();
}
