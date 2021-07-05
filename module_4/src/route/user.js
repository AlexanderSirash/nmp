'use strict';

import { Router } from 'express';
import { autoSuggestUsersValidation, userValidation } from '../validators/index.js';
import { UserController } from '../controllers/index.js';

const router = Router();

export const userRouter = () => {
  router.param('id', UserController.idParamGuard);

  router.route('/:id')
  .get(UserController.getUser)
  .put(userValidation, UserController.updateUser)
  .delete(UserController.removeUser);

  router.route('/')
  .get(autoSuggestUsersValidation, UserController.autoSuggestUsers)
  .post(userValidation, UserController.addUser);

  return router;
};
