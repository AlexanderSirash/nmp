import Joi from 'joi';
import { statusCodes } from '../../config/index.js';

const groupSchema = Joi.object().keys({
  name: Joi.string().required(),
  permissions: Joi.array().items('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES').unique().required(),
});

export function groupValidation(req, res, next) {
  const validationResult = groupSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(statusCodes.BAD_REQUEST).json(validationResult.error.details);
  }
  next();
}
