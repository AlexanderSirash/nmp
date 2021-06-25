'use strict';

import { Router } from 'express';
import config from '../../config/index.js';

const router = Router();

export default () => {
  router.route('/')
  .get((req, res) => res.json({
    version: config.server.version,
    name: config.server.name,
    description: config.server.description,
  }));

  return router;
};
