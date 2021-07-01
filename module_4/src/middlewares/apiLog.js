import logger from '../logger/index.js';

export function apiLog(req, res, next) {
  const { method, path, params, query, body } = req;
  const message = `| Method:${method} | Path:${path} | Params: ${JSON.stringify(params)} | `
    +
    `Query: ${JSON.stringify(query)} | Body:${JSON.stringify(body)} |`;

  logger.info(message);
  next();
}
