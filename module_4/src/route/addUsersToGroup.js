'use strict';

import { Router } from 'express';
import requestValidation, { addUsersToGroupSchema } from '../validators/index.js';
import { AddUsersToGroupController } from '../controllers/index.js';
import { AddUsersToGroupService } from '../service/index.js';
import { AddUsersToGroupQuery } from '../query/index.js';

export const addUsersToGroupControllerInst = new AddUsersToGroupController(
  new AddUsersToGroupService(new AddUsersToGroupQuery()));

export const addUsersToGroupRouter = () => {
  const router = Router();

  router.route('/')
  .post(requestValidation(addUsersToGroupSchema, 'body'), (req, res) => addUsersToGroupControllerInst.addUsersToGroup(req, res));

  return router;
};
