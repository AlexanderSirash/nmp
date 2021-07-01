'use strict';

import { Router } from 'express';
import { addUsersToGroupValidation } from '../validators/index.js';
import { statusCodes } from '../../config/index.js';
import { AddUsersToGroupService } from '../service/index.js';

const router = Router();

export const addUsersToGroupRouter = () => {
  router.route('/')
  .post(addUsersToGroupValidation, async (req, res) => {
    try {
      const response = await AddUsersToGroupService.addUsersToGroup(req.body.groupId, req.body.userId);
      response?.error ? res.status(statusCodes.NOT_FOUND).json(response) : res.status(statusCodes.OK).json(response);
    } catch (e) {
      res.status(statusCodes.INTERNAL_ERROR).json(e.message);
    }
  });

  return router;
};
