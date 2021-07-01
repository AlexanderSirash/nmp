'use strict';

import { Router } from 'express';
import { statusCodes } from '../../config/index.js';
import { loginValidation } from '../validators/index.js';
import { LoginService } from '../service/index.js';

const router = Router();

export const loginRouter = () => {
  router.route('/')
  .post(loginValidation, async (req, res) => {
    try {
      const response = await LoginService.login(req.body.username, req.body.password);
      if (response?.error) {
        res.status(statusCodes.UNAUTHORIZED).json(response);
      }
      const { token, refresh } = response;
      res.cookie('refreshToken', refresh);
      res.status(statusCodes.OK).send({ token });
    } catch (e) {
      res.status(statusCodes.INTERNAL_ERROR).json(e.message);
    }
  });

  return router;
};
