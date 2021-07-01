import { LogService } from './index.js';
import { LoginQuery } from '../query/index.js';
import { JWT as jwtConfig } from '../../config/index.js';
import jwt from 'jsonwebtoken';

class Login extends LogService {
  constructor() {
    super();
    this.query = new LoginQuery();
  }

  async login(username, password) {
    const user = await this.query.getUser(username);

    if (!user || user.password !== password || user.username !== username) {
      return {
        error: {
          title: 'unauthorized',
          description: 'Incorrect username or password',
        },
      };
    }
    const payload = { username: user.username, role: user.role };

    return {
      token: jwt.sign({ payload }, jwtConfig.secret, { expiresIn: jwtConfig.expiresAccess * jwtConfig.secInMin }),
      refresh: jwt.sign({ payload }, jwtConfig.secret, { expiresIn: jwtConfig.expiresRefresh * jwtConfig.secInMin }),
    };

  }
}

export default new Login();
