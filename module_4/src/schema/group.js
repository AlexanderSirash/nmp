import Joi from 'joi';

export const groupSchema = Joi.object().keys({
  name: Joi.string().required(),
  permissions: Joi.array().items('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES').unique().required(),
});
