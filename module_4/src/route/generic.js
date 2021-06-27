'use strict';

import { Router } from 'express';
import { server } from '../../config/index.js';

const router = Router();

export const genericRouter = () => {
		router.route('/')
		.get((req, res) => res.json({
				version: server.version,
				name: server.name,
				description: server.description,
		}));

		return router;
};
