import db from '../../db/index.js';

export class LoginQuery {

  getUser(username) {
    return db.connection.Credentials.findOne({ where: { username } });
  }

}

