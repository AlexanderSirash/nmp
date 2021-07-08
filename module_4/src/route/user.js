'use strict';

import { Router } from 'express';
import { autoSuggestUsersValidation, userValidation } from '../schema/validation.js';
import config from '../../config/index.js';
import UserService from '../service/user.js';

const router = Router();

export default () => {
  router.param('id', async (req, res, next, id) => {
    try {
      const isUserExist = await UserService.checkIsUserExist(id);
      if (!isUserExist) {
        res.status(config.statusCodes.NOT_FOUND).send({
          error: {
            title: 'Not found',
            description: `User with id:${id} not found`,
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
      const response = await UserService.getUser(req.params.id);
      res.status(config.statusCodes.OK).json(response);
    } catch (e) {
      res.status(config.statusCodes.INTERNAL_ERROR).json(e.message);
    }
  })
  .put(userValidation, async (req, res) => {
    try {
      const [, updatedUser] = await UserService.updateUser(req.body, req.params.id);
      res.status(config.statusCodes.OK).json(updatedUser);
    } catch (e) {
      res.status(config.statusCodes.INTERNAL_ERROR).json(e.message);
    }
  })
  .delete(async (req, res) => {
    try {
      const response = await UserService.removeUser(req.params.id);
      res.status(config.statusCodes.OK).json(response);
    } catch (e) {
      res.status(config.statusCodes.INTERNAL_ERROR).json(e.message);
    }
  });

  router.route('/')
  .get(autoSuggestUsersValidation, async (req, res) => {
    try {
      const response = await UserService.autoSuggestUsers(req.query);
      res.status(config.statusCodes.OK).json(response);
    } catch (e) {
      res.status(config.statusCodes.INTERNAL_ERROR).json(e.message);
    }
  })
  .post(userValidation, async (req, res) => {
    try {
      const { dataValues: { id } } = await UserService.addUser(req.body);
      res.status(config.statusCodes.OK).json(id);
    } catch (e) {
      res.status(config.statusCodes.INTERNAL_ERROR).json(e.message);
    }
  });

  return router;
};
