import db from '../db/index.js';
import sequelize from 'sequelize';

class UserQuery {

  addUser(userData) {
    return db.connection.User.create(userData);
  }

  getUser(id) {
    return db.connection.User.findOne({ where: { id } });
  }

  updateUser(dataForUpdate, id) {
    return db.connection.User.update(dataForUpdate, {
      where: { id },
      returning: true,
    });
  }

  autoSuggestUsers(reqQuery) {
    const { loginSubstring, limit } = reqQuery;

    return db.connection.User.findAll({
      limit, where: {
        login: { [sequelize.Op.iLike]: `%${loginSubstring}%` },
      },
    });
  }
}

export default new UserQuery();
