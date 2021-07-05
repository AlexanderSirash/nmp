'use strict';

import { Router } from 'express';
import { groupValidation } from '../validators/index.js';
import { GroupController } from '../controllers/index.js';

const router = Router();

export const groupRouter = () => {
  router.param('id', GroupController.idParamGuard);

  router.route('/:id')
  .get(GroupController.getGroup)
  .put(groupValidation, GroupController.updateGroup)
  .delete(GroupController.deleteGroup);

  router.route('/')
  .get(GroupController.getAllGroups)
  .post(groupValidation, GroupController.addGroup);

  return router;
};
