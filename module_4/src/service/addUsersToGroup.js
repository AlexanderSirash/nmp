import query from '../query/addUsersToGroup.js';

class AddUsersToGroup {
  addUsersToGroup(groupId, userId) {
    return query.addUsersToGroup(groupId, userId);
  }
}

export default new AddUsersToGroup();

