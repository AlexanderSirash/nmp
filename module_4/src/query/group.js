import db from '../db/index.js';

class GroupQuery {

  addGroup(groupData) {
    return db.connection.Group.create(groupData);
  }

  getGroup(id) {
    return db.connection.Group.findOne({ where: { id } });
  }

  updatedGroup(dataForUpdate, id) {
    return db.connection.Group.update(dataForUpdate, {
      where: { id },
      returning: true,
    });
  }

  getAllGroups() {
    return db.connection.Group.findAll();
  }

  removeGroup(id) {
    return db.connection.Group.destroy({
      where: { id },
    });
  }
}

export default new GroupQuery();
