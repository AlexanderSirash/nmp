'use strict';

import { Router } from 'express';
import { autoSuggestUsersValidation, userValidation } from '../schema/validation.js';
import statusCodes from '../../statusCodes.js';
import UserService from '../service/User.js';

const router = Router();

export default () => {
  router.param('id', (req, res, next, id) => {

    const isUserExist = UserService.checkIsUserExist(id);

    if (!isUserExist) {
      res.status(statusCodes.NOT_FOUND).send({
        error: {
          title: 'Not found',
          description: 'User with such id not found',
        },
      });
    } else {
      next();
    }
  });

  router.route('/:id')
  .get((req, res) => res.status(statusCodes.OK).json(UserService.getUser(req.params.id)))
  .put(userValidation, (req, res) => res.status(statusCodes.OK).json(UserService.updateUser(req.body, req.params.id)))
  .delete((req, res) => res.status(statusCodes.OK).json(UserService.removeUser(req.params.id)));

  router.route('/')
  .get(autoSuggestUsersValidation, (req, res) =>
      res.status(statusCodes.OK).json(UserService.autoSuggestUsers(req.query)))
  .post(userValidation, (req, res) => res.status(statusCodes.OK).json(UserService.addUser(req.body)));

  return router;
};
