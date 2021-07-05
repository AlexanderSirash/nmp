'use strict';

import { Router } from 'express';
import { GenericController } from '../controllers/index.js';

const router = Router();

export const genericRouter = () => {
  router.route('/')
  .get(GenericController.getGenericInfoAboutServer);

  return router;
};
