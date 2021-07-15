import { statusCodes } from '../../config/index.js';

export * from './addUsersToGroup.js';
export * from './group.js';
export * from './user.js';
export * from './login.js';

export default (schema, payloadType = 'query') => (req, res, next) => {
  const validationResult = schema.validate(req[payloadType]);
  if (validationResult.error) {
    return res.status(statusCodes.BAD_REQUEST).json(validationResult.error.details);
  }
  next();
};
