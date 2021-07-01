import { JWT as jwtConfig, statusCodes } from '../../config/index.js';
import jwt from 'jsonwebtoken';

export function validateToken(req, res, next) {
  const tokenPosition = 1;
  const token = req.headers?.authorization?.split('Bearer ')[tokenPosition];

  if (!token) {
    res.status(statusCodes.UNAUTHORIZED).json({
      error: {
        title: 'unauthorized',
        description: 'Token was not provided',
      },
    });

    return;
  }

  try {
    res.locals.decoded = jwt.verify(token, jwtConfig.secret);
    next();
  } catch (error) {
    res.status(statusCodes.FORBIDDEN).json({ error: { title: 'Token error', description: error.message } });
  }
}

