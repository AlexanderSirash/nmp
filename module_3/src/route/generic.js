'use strict';

import { Router } from 'express';
import config from '../../config.js';

const router = Router();

export default () => {
  router.route('/')
  .get((req, res) => res.json({
    version: config.version,
    name: config.name,
    description: config.description,
  }));

  return router;
};
