import { statusCodes } from '../../config/index.js';

export class AddUsersToGroupController {
  constructor(service) {
    this.addUsersToGroupService = service;
  }

  async addUsersToGroup(req, res) {
    try {
      const response = await this.addUsersToGroupService.addUsersToGroup(req.body.groupId, req.body.userId);
      res.status(statusCodes.OK).json(response);
    } catch (e) {
      res.status(statusCodes.INTERNAL_ERROR).json({
        error: {
          title: 'Internal server error',
          description: e.message,
        },
      });
    }
  }
}

