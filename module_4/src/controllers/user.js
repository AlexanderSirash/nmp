import { UserService } from '../service/index.js';
import { statusCodes } from '../../config/index.js';

class User {
  async idParamGuard(req, res, next, id) {
    try {
      const isUserExist = await UserService.checkIsUserExist(id);
      if (!isUserExist) {
        res.status(statusCodes.NOT_FOUND).json({
          error: {
            title: 'Not found',
            description: `User with id:${id} not found`,
          },
        });
      } else {
        next();
      }
    } catch (e) {
      res.status(statusCodes.INTERNAL_ERROR).json(e.message);
    }
  }

  async addUser(req, res) {
    try {
      const { dataValues: { id } } = await UserService.addUser(req.body);
      res.status(statusCodes.OK).json(id);
    } catch (e) {
      res.status(statusCodes.INTERNAL_ERROR).json(e.message);
    }
  }

  async getUser(req, res) {
    try {
      const response = await UserService.getUser(req.params.id);
      res.status(statusCodes.OK).json(response);
    } catch (e) {
      res.status(statusCodes.INTERNAL_ERROR).json(e.message);
    }
  }

  async updateUser(req, res) {
    try {
      const [, updatedUser] = await UserService.updateUser(req.body, req.params.id);
      res.status(statusCodes.OK).json(updatedUser);
    } catch (e) {
      res.status(statusCodes.INTERNAL_ERROR).json(e.message);
    }
  }

  async removeUser(req, res) {
    try {
      const response = await UserService.removeUser(req.params.id);
      res.status(statusCodes.OK).json(response);
    } catch (e) {
      res.status(statusCodes.INTERNAL_ERROR).json(e.message);
    }
  }

  async autoSuggestUsers(req, res) {
    try {
      const response = await UserService.autoSuggestUsers(req.query);
      res.status(statusCodes.OK).json(response);
    } catch (e) {
      res.status(statusCodes.INTERNAL_ERROR).json(e.message);
    }
  }
}

export default new User();
