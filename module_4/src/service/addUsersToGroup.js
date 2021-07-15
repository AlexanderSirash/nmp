import { LogService } from './index.js';

export class AddUsersToGroupService extends LogService {
  constructor(query) {
    super();
    this.query = query;
  }

  addUsersToGroup(groupId, userId) {
    return this.query.addUsersToGroup(groupId, userId);
  }
}

