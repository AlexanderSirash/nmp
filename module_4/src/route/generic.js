'use strict';

import { Router } from 'express';
import { GenericController } from '../controllers/index.js';

export const genericControllerInst = new GenericController();

export const genericRouter = () => {

  const router = Router();

  router.route('/')
  .get((req, res) => genericControllerInst.getGenericInfoAboutServer(req, res));

  return router;
};
