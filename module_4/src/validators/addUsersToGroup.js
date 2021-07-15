import Joi from 'joi';

export const addUsersToGroupSchema = Joi.object().keys({
  userId: Joi.number().required(),
  groupId: Joi.number().required(),
});
