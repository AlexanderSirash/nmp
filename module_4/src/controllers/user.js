import { statusCodes } from '../../config/index.js';

export class UserController {

  constructor(service) {
    this.userService = service;
  }

  async idParamGuard(req, res, next, id) {
    try {
      const isUserExist = await this.userService.checkIsUserExist(id);
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
      res.status(statusCodes.INTERNAL_ERROR).json({
        error: {
          title: 'Internal server error',
          description: e.message,
        },
      });
    }
  }

  async addUser(req, res) {
    try {
      const { dataValues: { id } } = await this.userService.addUser(req.body);
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

  async getUser(req, res) {
    try {
      const response = await this.userService.getUser(req.params.id);
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

  async updateUser(req, res) {
    try {
      const [, updatedUser] = await this.userService.updateUser(req.body, req.params.id);
      res.status(statusCodes.OK).json(updatedUser);
    } catch (e) {
      res.status(statusCodes.INTERNAL_ERROR).json({
        error: {
          title: 'Internal server error',
          description: e.message,
        },
      });
    }
  }

  async removeUser(req, res) {
    try {
      const response = await this.userService.removeUser(req.params.id);
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

  async autoSuggestUsers(req, res) {
    try {
      const response = await this.userService.autoSuggestUsers(req.query);
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

