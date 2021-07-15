import { statusCodes } from '../../../config/index.js';
import request from 'supertest';
import { groupControllerInst, groupRouter } from '../../route/group.js';
import { mockExpressApp } from '../../../tests-utils/expressAppMock.js';

jest.mock('../../service/index.js', () => ({
  GroupService: jest.fn().mockReturnValue({
    checkIsGroupExist: jest.fn(),
    addGroup: jest.fn(),
    getGroup: jest.fn(),
    updateGroup: jest.fn(),
    getAllGroups: jest.fn(),
    removeGroup: jest.fn(),
  }),
}));

jest.mock('../../query/index.js', () => ({
  GroupQuery: jest.fn(),
}));

const customErrorMessageOjb = id => ({
  error: {
    title: 'Not found',
    description: `Group with id:${id} not found`,
  },
});

const internalError = { message: 'Internal server error' };
const jsonFormatInternalErrorMsg = JSON.stringify({
  error: {
    title: 'Internal server error',
    description: internalError.message,
  },
});

describe('groupRouter', () => {

  const app = mockExpressApp(groupRouter);
  const id = 1;

  const groupMock = {
    id,
    name: 'worker',
    permissions: [
      'READ',
    ],
  };

  const updatedGroupMock = {
    name: 'student',
    permissions: [
      'READ',
    ],
  };

  const invalidUpdatedGroupMock = {
    names: 'student',
    permissions: [
      'READ',
    ],
  };

  beforeEach(() => {
    jest.spyOn(groupControllerInst.groupService, 'checkIsGroupExist').mockResolvedValue(true);
  });

  describe('/:id', () => {

    describe('param validation', () => {
      it('should validate param and get not found error if group isn\'t found', (done) => {

        jest.spyOn(groupControllerInst.groupService, 'checkIsGroupExist').mockResolvedValue(false);

        request(app)
        .get(`/${id}`)
        .expect(statusCodes.NOT_FOUND)
        .expect(customErrorMessageOjb(id))
        .end(done);
      });

      it('should validate param and handle Internal server error', (done) => {
        jest.spyOn(groupControllerInst.groupService, 'checkIsGroupExist').mockRejectedValue(internalError);

        request(app)
        .get(`/${id}`)
        .expect(statusCodes.INTERNAL_ERROR)
        .expect(jsonFormatInternalErrorMsg)
        .end(done);
      });
    });

    describe('get group ', () => {
      it('should find and return group by id', (done) => {
        jest.spyOn(groupControllerInst.groupService, 'getGroup').mockResolvedValue(groupMock);

        request(app)
        .get(`/${id}`)
        .expect(groupMock)
        .expect(statusCodes.OK)
        .end(done);
      });

      it('should find group by id and handle Internal server error', (done) => {
        jest.spyOn(groupControllerInst.groupService, 'getGroup').mockRejectedValue(internalError);

        request(app)
        .get(`/${id}`)
        .expect(statusCodes.INTERNAL_ERROR)
        .expect(jsonFormatInternalErrorMsg)
        .end(done);
      });
    });

    describe('update group ', () => {

      it('should validate data and throw JOI validation error', (done) => {
        jest.spyOn(groupControllerInst.groupService, 'updateGroup').mockResolvedValue([{}, updatedGroupMock]);

        request(app)
        .put(`/${id}`)
        .send(invalidUpdatedGroupMock)
        .expect(statusCodes.BAD_REQUEST)
        .end(done);
      });

      it('should find and return group by id', (done) => {
        jest.spyOn(groupControllerInst.groupService, 'updateGroup').mockResolvedValue([{}, updatedGroupMock]);

        request(app)
        .put(`/${id}`)
        .send(updatedGroupMock)
        .expect(updatedGroupMock)
        .expect(statusCodes.OK)
        .end(done);
      });

      it('should update group by id and handle Internal server error', (done) => {
        jest.spyOn(groupControllerInst.groupService, 'updateGroup').mockRejectedValue(internalError);

        request(app)
        .put(`/${id}`)
        .send(updatedGroupMock)
        .expect(statusCodes.INTERNAL_ERROR)
        .expect(jsonFormatInternalErrorMsg)
        .end(done);
      });

    });

    describe('delete group ', () => {
      const dbResponse = 1;

      it('should delete group by id', (done) => {
        jest.spyOn(groupControllerInst.groupService, 'removeGroup').mockResolvedValue(dbResponse);

        request(app)
        .delete(`/${id}`)
        .expect(statusCodes.OK)
        .end(done);
      });

      it('should delete group by id and handle Internal server error', (done) => {
        jest.spyOn(groupControllerInst.groupService, 'removeGroup').mockRejectedValue(internalError);

        request(app)
        .delete(`/${id}`)
        .expect(statusCodes.INTERNAL_ERROR)
        .expect(jsonFormatInternalErrorMsg)
        .end(done);
      });

    });
  });

  describe('/', () => {

    describe('get all groups ', () => {
      const mockGroups = [
        {
          'id': 1,
          'name': 'scheduler',
          'permissions': [
            'READ',
            'WRITE',
            'DELETE',
            'SHARE',
            'UPLOAD_FILES',
          ],
        },
        {
          'id': 2,
          'name': 'worker',
          'permissions': [
            'READ',
          ],
        },
      ];

      it('should get all groups', (done) => {
        jest.spyOn(groupControllerInst.groupService, 'getAllGroups').mockResolvedValue(mockGroups);

        request(app)
        .get('/')
        .expect(mockGroups)
        .expect(statusCodes.OK)
        .end(done);

      });

      it('should get all groups and handle Internal server error', (done) => {
        jest.spyOn(groupControllerInst.groupService, 'getAllGroups').mockRejectedValue(internalError);

        request(app)
        .get('/')
        .expect(statusCodes.INTERNAL_ERROR)
        .expect(jsonFormatInternalErrorMsg)
        .end(done);

      });

    });

    describe('add group', () => {
      const response = { dataValues: { id: 1 } };

      it('should validate data and throw JOI validation error', (done) => {
        jest.spyOn(groupControllerInst.groupService, 'addGroup').mockResolvedValue(response);

        request(app)
        .post('/')
        .send(invalidUpdatedGroupMock)
        .expect(statusCodes.BAD_REQUEST)
        .end(done);
      });

      it('should add new group', (done) => {
        jest.spyOn(groupControllerInst.groupService, 'addGroup').mockResolvedValue(response);

        request(app)
        .post('/')
        .send(updatedGroupMock)
        .expect(JSON.stringify(id))
        .expect(statusCodes.OK)
        .end(done);
      });
    });

    it('should add new group and handle Internal server error', (done) => {
      jest.spyOn(groupControllerInst.groupService, 'addGroup').mockRejectedValue(internalError);

      request(app)
      .post('/')
      .send(updatedGroupMock)
      .expect(statusCodes.INTERNAL_ERROR)
      .expect(jsonFormatInternalErrorMsg)
      .end(done);
    });
  });
});

