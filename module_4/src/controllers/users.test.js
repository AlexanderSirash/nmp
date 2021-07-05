jest.mock('../service/index.js', () => ({
  UserService: {
    checkIsUserExist: jest.fn(),
    addUser: jest.fn(),
    getUser: jest.fn(),
    updateUser: jest.fn(),
    removeUser: jest.fn(),
    autoSuggestUsers: jest.fn(),
  },
}));

import UserController from './user.js';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { statusCodes } from '../../config/index.js';
import { UserService } from '../service/index.js';

const { res } = getMockRes();

const internalError = { message: 'Internal error' };

function checkHandleErrorExpectation(res) {
  expect(res.status).toHaveBeenCalledWith(statusCodes.INTERNAL_ERROR);
  expect(res.json).toHaveBeenCalledWith(internalError.message);
}

describe('Users', () => {

  describe('idParamGuard', () => {
    const req = getMockReq();
    const next = jest.fn();
    const id = 1;

    it('should call UserService.checkIsGroupExist and  return "Not found" error', async () => {
      jest.spyOn(UserService, 'checkIsUserExist').mockResolvedValue(false);

      await UserController.idParamGuard(req, res, next, id);

      expect(UserService.checkIsUserExist).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(statusCodes.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith({
        error: {
          title: 'Not found',
          description: 'User with id:1 not found',
        },
      });
    });

    it('should UserService.checkIsGroupExist and allow to continue', async () => {
      jest.spyOn(UserService, 'checkIsUserExist').mockResolvedValue(true);

      await UserController.idParamGuard(req, res, next, id);

      expect(UserService.checkIsUserExist).toHaveBeenCalledWith(id);
      expect(next).toHaveBeenCalled();
    });

    it('should call UserService.checkIsGroupExist and return "Internal" error', async () => {
      jest.spyOn(UserService, 'checkIsUserExist').mockRejectedValue(internalError);

      await UserController.idParamGuard(req, res, next, id);

      checkHandleErrorExpectation(res);
    });
  });

  describe('addUser', () => {
    const body = {
      login: 'alexandeeeeeer',
      password: '12345a',
      age: 4,
    };
    const req = getMockReq({
      body,
    });

    it('should call UserService.addUser and handle successful response', async () => {
      const id = 1;
      jest.spyOn(UserService, 'addUser').mockResolvedValue({ dataValues: { id } });

      await UserController.addUser(req, res);

      expect(UserService.addUser).toHaveBeenCalledWith(body);
      expect(res.status).toHaveBeenCalledWith(statusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(id);
    });

    it('should call UserService.addUser and handle error', async () => {
      jest.spyOn(UserService, 'addUser').mockRejectedValue(internalError);

      await UserController.addUser(req, res);

      expect(UserService.addUser).toHaveBeenCalled();
      checkHandleErrorExpectation(res);
    });
  });

  describe('getUser', () => {
    const id = 1;
    const req = getMockReq({
      params: {
        id: 1,
      },
    });

    it('should call UserService.getUser and handle successful response', async () => {
      const response = { id };
      jest.spyOn(UserService, 'getUser').mockResolvedValue(response);

      await UserController.getUser(req, res);

      expect(UserService.getUser).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(statusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(response);
    });

    it('should call UserService.getUser and handle error', async () => {
      jest.spyOn(UserService, 'getUser').mockRejectedValue(internalError);

      await UserController.getUser(req, res);

      expect(UserService.getUser).toHaveBeenCalled();
      checkHandleErrorExpectation(res);
    });
  });

  describe('updateUser', () => {
    const id = 1;
    const req = getMockReq({
      params: {
        id,
      },
    });

    it('should call UserService.updateUser and handle successful response', async () => {
      const updatedUser = { id };
      const response = [{}, updatedUser];
      jest.spyOn(UserService, 'updateUser').mockResolvedValue(response);

      await UserController.updateUser(req, res);

      expect(UserService.updateUser).toHaveBeenCalledWith({}, id);
      expect(res.status).toHaveBeenCalledWith(statusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(updatedUser);
    });

    it('should call UserService.updateUser and handle error', async () => {
      jest.spyOn(UserService, 'updateUser').mockRejectedValue(internalError);

      await UserController.updateUser(req, res);

      expect(UserService.updateUser).toHaveBeenCalled();
      checkHandleErrorExpectation(res);
    });
  });

  describe('removeUser', () => {
    const response = 'success';
    const id = 1;
    const req = getMockReq({
      params: {
        id,
      },
    });

    it('should call UserService.removeUser and handle successful response', async () => {

      jest.spyOn(UserService, 'removeUser').mockResolvedValue(response);

      await UserController.removeUser(req, res);

      expect(UserService.removeUser).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(statusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(response);
    });

    it('should call UserService.removeUser and handle error', async () => {
      jest.spyOn(UserService, 'removeUser').mockRejectedValue(internalError);

      await UserController.removeUser(req, res);

      expect(UserService.removeUser).toHaveBeenCalled();
      checkHandleErrorExpectation(res);

    });
  });

  describe('autoSuggestUsers', () => {
    const response = [{ id: 5, login: 'katya2', password: '12345a', age: 15, isDeleted: true }];
    const query = { loginSubstring: 'k', limit: '5' };
    const req = getMockReq({ query });

    it('should call UserService.autoSuggestUsers and handle successful response', async () => {

      jest.spyOn(UserService, 'autoSuggestUsers').mockResolvedValue(response);

      await UserController.autoSuggestUsers(req, res);

      expect(UserService.autoSuggestUsers).toHaveBeenCalledWith(query);
      expect(res.status).toHaveBeenCalledWith(statusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(response);
    });

    it('should call UserService.autoSuggestUsers and handle error', async () => {
      jest.spyOn(UserService, 'autoSuggestUsers').mockRejectedValue(internalError);

      await UserController.autoSuggestUsers(req, res);

      expect(UserService.autoSuggestUsers).toHaveBeenCalled();
      checkHandleErrorExpectation(res);

    });
  });

});
