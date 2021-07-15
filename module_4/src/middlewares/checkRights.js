import { statusCodes } from '../../config/index.js';

export function checkRights(req, res, next) {
  const restrictedUserReqMethods = ['POST', 'PUT', 'DELETE', 'PATCH'];

  const { payload: { role } } = res.locals?.decoded;

  if (role !== 'admin' && role !== 'user') {
    res.status(statusCodes.NOT_FOUND).json({
      error: {
        title: 'Not found',
        description: 'Your role is not supported. Please contact admins',
      },
    });

    return;
  }
  if (role === 'user') {
    if (restrictedUserReqMethods.includes(req.method)) {

      res.status(statusCodes.NOT_ALLOWED).json({
        error: {
          title: 'Not allowed',
          description: 'You can\'t modify any data',
        },
      });

      return;

    }
  }
  next();
}

