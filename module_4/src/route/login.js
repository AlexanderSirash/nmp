'use strict';

import { Router } from 'express';
import { loginValidation } from '../validators/index.js';
import { LoginController } from '../controllers/index.js';
import { LoginService } from '../service/index.js';
import { LoginQuery } from '../query/index.js';

export const loginControllerInst = new LoginController(new LoginService(new LoginQuery()));

export const loginRouter = () => {
  const router = Router();

  router.route('/')
  .post(loginValidation, (req, res) => loginControllerInst.login(req, res));

  return router;
};
