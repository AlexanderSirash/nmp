'use strict';

import { Router } from 'express';
import { addUsersToGroupValidation } from '../schema/validation.js';
import AddUsersToGroupService from '../service/addUsersToGroup.js';
import config from '../../config/index.js';

const router = Router();

export default () => {
  router.route('/')
  .post(addUsersToGroupValidation, async (req, res) => {
    try {
      const response = await AddUsersToGroupService.addUsersToGroup(req.body.groupId, req.body.userId);
      res.status(config.statusCodes.OK).json(response);
    } catch (e) {
      res.status(config.statusCodes.INTERNAL_ERROR).json(e.message);
    }
  });

  return router;
};
