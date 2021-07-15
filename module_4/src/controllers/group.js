import { statusCodes } from '../../config/index.js';

export class GroupController {
  constructor(service) {
    this.groupService = service;
  }

  async idParamGuard(req, res, next, id) {
    try {
      const isGroupExist = await this.groupService.checkIsGroupExist(id);
      if (!isGroupExist) {
        res.status(statusCodes.NOT_FOUND).json({
          error: {
            title: 'Not found',
            description: `Group with id:${id} not found`,
          },
        });
      } else {
        next();
      }
    } catch (e) {
      res.status(statusCodes.INTERNAL_ERROR).json({
        error: {
          title: 'Internal server error',
          description: e.message,
        },
      });
    }
  }

  async getGroup(req, res) {
    try {
      const response = await this.groupService.getGroup(req.params.id);
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

  async updateGroup(req, res) {
    try {
      const [, updatedGroup] = await this.groupService.updateGroup(req.body, req.params.id);
      res.status(statusCodes.OK).json(updatedGroup);
    } catch (e) {
      res.status(statusCodes.INTERNAL_ERROR).json({
        error: {
          title: 'Internal server error',
          description: e.message,
        },
      });
    }
  }

  async deleteGroup(req, res) {
    try {
      await this.groupService.removeGroup(req.params.id);
      res.status(statusCodes.OK).json('success');
    } catch (e) {
      res.status(statusCodes.INTERNAL_ERROR).json({
        error: {
          title: 'Internal server error',
          description: e.message,
        },
      });
    }
  }

  async getAllGroups(req, res) {
    try {
      const response = await this.groupService.getAllGroups();
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

  async addGroup(req, res) {
    try {
      const { dataValues: { id } } = await this.groupService.addGroup(req.body);
      res.status(statusCodes.OK).json(id);
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

