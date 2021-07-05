import { statusCodes } from '../../config/index.js';
import { GroupService } from '../service/index.js';

class Group {
  async idParamGuard(req, res, next, id) {
    try {
      const isGroupExist = await GroupService.checkIsGroupExist(id);
      if (!isGroupExist) {
        res.status(statusCodes.NOT_FOUND).send({
          error: {
            title: 'Not found',
            description: `Group with id:${id} not found`,
          },
        });
      } else {
        next();
      }
    } catch (e) {
      res.status(statusCodes.INTERNAL_ERROR).json(e.message);
    }
  }

  async getGroup(req, res) {
    try {
      const response = await GroupService.getGroup(req.params.id);
      res.status(statusCodes.OK).json(response);
    } catch (e) {
      res.status(statusCodes.INTERNAL_ERROR).json(e.message);
    }
  }

  async updateGroup(req, res) {
    try {
      const [, updatedGroup] = await GroupService.updateGroup(req.body, req.params.id);
      res.status(statusCodes.OK).json(updatedGroup);
    } catch (e) {
      res.status(statusCodes.INTERNAL_ERROR).json(e.message);
    }
  }

  async deleteGroup(req, res) {
    try {
      await GroupService.removeGroup(req.params.id);
      res.status(statusCodes.OK).json('success');
    } catch (e) {
      res.status(statusCodes.INTERNAL_ERROR).json(e.message);
    }
  }

  async getAllGroups(req, res) {
    try {
      const response = await GroupService.getAllGroups();
      res.status(statusCodes.OK).json(response);
    } catch (e) {
      res.status(statusCodes.INTERNAL_ERROR).json(e.message);
    }
  }

  async addGroup(req, res) {
    try {
      const { dataValues: { id } } = await GroupService.addGroup(req.body);
      res.status(statusCodes.OK).json(id);
    } catch (e) {
      res.status(statusCodes.INTERNAL_ERROR).json(e.message);
    }
  }
}

export default new Group();
