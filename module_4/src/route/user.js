'use strict';

import { Router } from 'express';
import requestValidation, { autoSuggestUsersSchema, userSchema } from '../validators/index.js';
import { UserController } from '../controllers/index.js';
import { UserService } from '../service/index.js';
import { UserQuery } from '../query/index.js';

export const userControllerInst = new UserController(new UserService(new UserQuery()));

export const userRouter = () => {

  const router = Router();

  router.param('id', (req, res, next, id) => userControllerInst.idParamGuard(req, res, next, id));

  router.route('/:id')
  .get((req, res) => userControllerInst.getUser(req, res))
  .put(requestValidation(userSchema, 'body'), (req, res) => userControllerInst.updateUser(req, res))
  .delete((req, res) => userControllerInst.removeUser(req, res));

  router.route('/')
  .get(requestValidation(autoSuggestUsersSchema), (req, res) => userControllerInst.autoSuggestUsers(req, res))

  .post(requestValidation(userSchema, 'body'), (req, res) => userControllerInst.addUser(req, res));

  return router;
};
