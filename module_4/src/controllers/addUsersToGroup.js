import { AddUsersToGroupService } from '../service/index.js';
import { statusCodes } from '../../config/index.js';

class AddUsersToGroup {
  async addUsersToGroup(req, res) {
    try {
      const response = await AddUsersToGroupService.addUsersToGroup(req.body.groupId, req.body.userId);
      res.status(statusCodes.OK).json(response);
    } catch (e) {
      res.status(statusCodes.INTERNAL_ERROR).json(e.message);
    }
  }
}

export default new AddUsersToGroup();
