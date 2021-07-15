import { statusCodes } from '../../config/index.js';

export class LoginController {
  constructor(service) {
    this.loginService = service;
  }

  async login(req, res) {
    try {
      const response = await this.loginService.login(req.body.username, req.body.password);
      if (response?.error) {
        res.status(statusCodes.UNAUTHORIZED).json(response);
      }
      const { token, refresh } = response;
      res.cookie('refreshToken', refresh);
      res.status(statusCodes.OK).send({ token });

    } catch (e) {
      res.status(statusCodes.INTERNAL_ERROR).json({
        error: {
          title: 'Internal server error',
          description: e.message,
        },
      });
    }
  }
}

