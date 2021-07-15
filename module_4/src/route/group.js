'use strict';

import { Router } from 'express';
import requestValidation, { groupSchema } from '../validators/index.js';
import { GroupController } from '../controllers/index.js';
import { GroupService } from '../service/index.js';
import { GroupQuery } from '../query/index.js';

export const groupControllerInst = new GroupController(new GroupService(new GroupQuery()));

export const groupRouter = () => {
  const router = Router();

  router.param('id', (req, res, next, id) => groupControllerInst.idParamGuard(req, res, next, id));

  router.route('/:id')
  .get((req, res) => groupControllerInst.getGroup(req, res))
  .put(requestValidation(groupSchema, 'body'), (req, res) => groupControllerInst.updateGroup(req, res))
  .delete((req, res) => groupControllerInst.deleteGroup(req, res));

  router.route('/')
  .get((req, res) => groupControllerInst.getAllGroups(req, res))
  .post(requestValidation(groupSchema, 'body'), (req, res) => groupControllerInst.addGroup(req, res));

  return router;
};
