import db from '../db/index.js';

class addUsersToGroupQuery {

  addUsersToGroup(groupId, userId) {
    const { Group, User } = db.connection;

    return db.connection.sequelize.transaction((tx) => {
      return Promise.all([
        User.findOne({ where: { id: userId }, transaction: tx }),
        Group.findOne({ where: { id: groupId }, transaction: tx }),
      ]).then(([user, group]) => {
        return user.addGroup(group);
      });
    });
  }
}

export default new addUsersToGroupQuery();
