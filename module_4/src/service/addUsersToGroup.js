import { AddUsersToGroupQuery } from '../query/index.js';
import { LogService } from './index.js';

class AddUsersToGroup extends LogService {
  constructor() {
    super();
    this.query = new AddUsersToGroupQuery();
  }

  addUsersToGroup(groupId, userId) {
    return this.query.addUsersToGroup(groupId, userId);
  }
}

export default new AddUsersToGroup();

