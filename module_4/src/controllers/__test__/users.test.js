import { userControllerInst } from '../../route/user.js';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { statusCodes } from '../../../config/index.js';

jest.mock('../../service/index.js', () => ({
  UserService: jest.fn().mockReturnValue({
    checkIsUserExist: jest.fn(),
    addUser: jest.fn(),
    getUser: jest.fn(),
    updateUser: jest.fn(),
    removeUser: jest.fn(),
    autoSuggestUsers: jest.fn(),
  }),
}));

jest.mock('../../query/index.js', () => ({
  UserQuery: jest.fn(),
}));

const { res } = getMockRes();

const internalError = { message: 'Internal server error' };
const responseInternalError = {
  error: { title: 'Internal server error', description: internalError.message },
};

function checkHandleErrorExpectation(res) {
  expect(res.status).toHaveBeenCalledWith(statusCodes.INTERNAL_ERROR);
  expect(res.json).toHaveBeenCalledWith(responseInternalError);
}

describe('Users', () => {

  describe('idParamGuard', () => {
    const req = getMockReq();
    const next = jest.fn();
    const id = 1;

    it('should call UserService.checkIsGroupExist and  return "Not found" error', async () => {
      jest.spyOn(userControllerInst.userService, 'checkIsUserExist').mockResolvedValue(false);

      await userControllerInst.idParamGuard(req, res, next, id);

      expect(userControllerInst.userService.checkIsUserExist).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(statusCodes.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith({
        error: {
          title: 'Not found',
          description: 'User with id:1 not found',
        },
      });
    });

    it('should UserService.checkIsGroupExist and allow to continue', async () => {
      jest.spyOn(userControllerInst.userService, 'checkIsUserExist').mockResolvedValue(true);

      await userControllerInst.idParamGuard(req, res, next, id);

      expect(userControllerInst.userService.checkIsUserExist).toHaveBeenCalledWith(id);
      expect(next).toHaveBeenCalled();
    });

    it('should call UserService.checkIsGroupExist and return "Internal" error', async () => {
      jest.spyOn(userControllerInst.userService, 'checkIsUserExist').mockRejectedValue(internalError);

      await userControllerInst.idParamGuard(req, res, next, id);

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
      jest.spyOn(userControllerInst.userService, 'addUser').mockResolvedValue({ dataValues: { id } });

      await userControllerInst.addUser(req, res);

      expect(userControllerInst.userService.addUser).toHaveBeenCalledWith(body);
      expect(res.status).toHaveBeenCalledWith(statusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(id);
    });

    it('should call UserService.addUser and handle error', async () => {
      jest.spyOn(userControllerInst.userService, 'addUser').mockRejectedValue(internalError);

      await userControllerInst.addUser(req, res);

      expect(userControllerInst.userService.addUser).toHaveBeenCalled();
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
      jest.spyOn(userControllerInst.userService, 'getUser').mockResolvedValue(response);

      await userControllerInst.getUser(req, res);

      expect(userControllerInst.userService.getUser).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(statusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(response);
    });

    it('should call UserService.getUser and handle error', async () => {
      jest.spyOn(userControllerInst.userService, 'getUser').mockRejectedValue(internalError);

      await userControllerInst.getUser(req, res);

      expect(userControllerInst.userService.getUser).toHaveBeenCalled();
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
      jest.spyOn(userControllerInst.userService, 'updateUser').mockResolvedValue(response);

      await userControllerInst.updateUser(req, res);

      expect(userControllerInst.userService.updateUser).toHaveBeenCalledWith({}, id);
      expect(res.status).toHaveBeenCalledWith(statusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(updatedUser);
    });

    it('should call UserService.updateUser and handle error', async () => {
      jest.spyOn(userControllerInst.userService, 'updateUser').mockRejectedValue(internalError);

      await userControllerInst.updateUser(req, res);

      expect(userControllerInst.userService.updateUser).toHaveBeenCalled();
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

      jest.spyOn(userControllerInst.userService, 'removeUser').mockResolvedValue(response);

      await userControllerInst.removeUser(req, res);

      expect(userControllerInst.userService.removeUser).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(statusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(response);
    });

    it('should call UserService.removeUser and handle error', async () => {
      jest.spyOn(userControllerInst.userService, 'removeUser').mockRejectedValue(internalError);

      await userControllerInst.removeUser(req, res);

      expect(userControllerInst.userService.removeUser).toHaveBeenCalled();
      checkHandleErrorExpectation(res);

    });
  });

  describe('autoSuggestUsers', () => {
    const response = [{ id: 5, login: 'katya2', password: '12345a', age: 15, isDeleted: true }];
    const query = { loginSubstring: 'k', limit: '5' };
    const req = getMockReq({ query });

    it('should call UserService.autoSuggestUsers and handle successful response', async () => {

      jest.spyOn(userControllerInst.userService, 'autoSuggestUsers').mockResolvedValue(response);

      await userControllerInst.autoSuggestUsers(req, res);

      expect(userControllerInst.userService.autoSuggestUsers).toHaveBeenCalledWith(query);
      expect(res.status).toHaveBeenCalledWith(statusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(response);
    });

    it('should call UserService.autoSuggestUsers and handle error', async () => {
      jest.spyOn(userControllerInst.userService, 'autoSuggestUsers').mockRejectedValue(internalError);

      await userControllerInst.autoSuggestUsers(req, res);

      expect(userControllerInst.userService.autoSuggestUsers).toHaveBeenCalled();
      checkHandleErrorExpectation(res);

    });
  });

});
