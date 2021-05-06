'use strict';

import { Router } from 'express';
import User from '../service/User.js';
import { autoSuggestUsersValidation, userValidation } from '../schema/validation.js';
import statusCodes from '../../statusCodes.js';

const router = Router();

export default () => {
  router.param('id', (req, res, next, id) => {

    const isUserExist = User.checkIsUserExist(id);

    if (!isUserExist) {
      res.status(statusCodes.notFound).send({
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
  .get((req, res) => User.getUser(req, res))
  .put(userValidation, (req, res) => User.updateUser(req, res))
  .delete((req, res) => User.removeUser(req, res));

  router.route('/')
  .get(autoSuggestUsersValidation, (req, res) => User.autoSuggestUsers(req, res))
  .post(userValidation, (req, res) => User.addUser(req, res));

  return router;
};
