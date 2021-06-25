'use strict';

import { Router } from 'express';
import { groupValidation } from '../schema/validation.js';
import config from '../../config/index.js';
import GroupService from '../service/group.js';

const router = Router();

export default () => {
  router.param('id', async (req, res, next, id) => {
    try {
      const isGroupExist = await GroupService.checkIsGroupExist(id);
      if (!isGroupExist) {
        res.status(config.statusCodes.NOT_FOUND).send({
          error: {
            title: 'Not found',
            description: `Group with id:${id} not found`,
          },
        });
      } else {
        next();
      }
    } catch (e) {
      res.status(config.statusCodes.INTERNAL_ERROR).json(e.message);
    }
  });

  router.route('/:id')
  .get(async (req, res) => {
    try {
      const response = await GroupService.getGroup(req.params.id);
      res.status(config.statusCodes.OK).json(response);
    } catch (e) {
      res.status(config.statusCodes.INTERNAL_ERROR).json(e.message);
    }
  })
  .put(groupValidation, async (req, res) => {
    try {
      const [, updatedGroup] = await GroupService.updatedGroup(req.body, req.params.id);
      res.status(config.statusCodes.OK).json(updatedGroup);
    } catch (e) {
      res.status(config.statusCodes.INTERNAL_ERROR).json(e.message);
    }
  })
  .delete(async (req, res) => {
    try {
      await GroupService.removeGroup(req.params.id);
      res.status(config.statusCodes.OK).json('success');
    } catch (e) {
      res.status(config.statusCodes.INTERNAL_ERROR).json(e.message);
    }
  });
  router.route('/')
  .get(async (req, res) => {
    try {
      const response = await GroupService.getAllGroups();
      res.status(config.statusCodes.OK).json(response);
    } catch (e) {
      res.status(config.statusCodes.INTERNAL_ERROR).json(e.message);
    }
  })
  .post(groupValidation, async (req, res) => {
    try {
      const { dataValues: { id } } = await GroupService.addGroup(req.body);
      res.status(config.statusCodes.OK).json(id);
    } catch (e) {
      res.status(config.statusCodes.INTERNAL_ERROR).json(e.message);
    }
  });

  return router;
};
