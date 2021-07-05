'use strict';

import { Router } from 'express';
import { loginValidation } from '../validators/index.js';
import { LoginController } from '../controllers/index.js';

const router = Router();

export const loginRouter = () => {
  router.route('/')
  .post(loginValidation, LoginController.login);

  return router;
};
