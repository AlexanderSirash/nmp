import Joi from 'joi';
import { statusCodes } from '../../config/index.js';

const addUsersToGroupSchema = Joi.object().keys({
  userId: Joi.number().required(),
  groupId: Joi.number().required(),
});

export function addUsersToGroupValidation(req, res, next) {
  const validationResult = addUsersToGroupSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(statusCodes.BAD_REQUEST).send(validationResult.error.details);
  }
  next();
}
