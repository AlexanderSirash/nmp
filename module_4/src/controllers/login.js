import { LoginService } from '../service/index.js';
import { statusCodes } from '../../config/index.js';

class Login {
  async login(req, res) {
    try {
      const response = await LoginService.login(req.body.username, req.body.password);
      if (response?.error) {
        res.status(statusCodes.UNAUTHORIZED).json(response);
      }
      const { token, refresh } = response;
      res.cookie('refreshToken', refresh);
      res.status(statusCodes.OK).send({ token });

    } catch (e) {
      res.status(statusCodes.INTERNAL_ERROR).json(e.message);
    }
  }
}

export default new Login();
