import { statusCodes } from '../../config/index.js';
import logger from '../logger/index.js';

export function generalErrorHandling(error, req, res, next) {
  if (error) {
    res.status(statusCodes.INTERNAL_ERROR).json({
      error: {
        title: 'Error during handling request. Please perform your last action again.',
        description: error.message,
      },
    });
    logger.error(error);
  } else {
    res.status(statusCodes.OK);
  }
}
