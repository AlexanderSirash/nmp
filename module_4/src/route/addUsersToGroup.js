'use strict';

import { Router } from 'express';
import { addUsersToGroupValidation } from '../validators/index.js';
import { AddUsersToGroupController } from '../controllers/index.js';

const router = Router();

export const addUsersToGroupRouter = () => {
  router.route('/')
  .post(addUsersToGroupValidation, AddUsersToGroupController.addUsersToGroup);

  return router;
};
