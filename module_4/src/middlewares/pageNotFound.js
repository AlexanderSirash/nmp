import { statusCodes } from '../../config/index.js';

export function pageNotFound(req, res, next) {
  res.status(statusCodes.NOT_FOUND).json({ error: { title: 'Not found', description: 'Page not found!' } });
}
