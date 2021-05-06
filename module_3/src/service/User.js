import API from './Api.js';
import { userModel } from '../model/user.js';
import { v4 as uuidv4 } from 'uuid';
import statusCodes from '../../statusCodes.js';

class User extends API {
  constructor() {
    super();
    this.users = [];

  }

  findUser(id) {
    return this.users.find(user => user.id === id);
  }

  updateUsers(updatedUser) {
    this.users = this.users.map(user => (user.id === updatedUser.id ? updatedUser : user));

    return this.users;
  }

  checkIsUserExist(id) {
    return !!this.findUser(id);
  }

  getUser(req, res) {
    res.status(statusCodes.ok).json(this.findUser(req.params.id));
  }

  addUser(req, res) {
    const user = super.filterModel(userModel, req.body);
    const id = uuidv4();
    this.users.push({ id, ...user, isDeleted: false });
    res.status(statusCodes.ok).json(id);
  }

  updateUser(req, res) {
    const user = this.findUser(req.params.id);
    const updatedUser = { ...user, ...super.filterModel(userModel, req.body) };
    this.updateUsers(updatedUser);
    res.status(statusCodes.ok).json(updatedUser);
  }

  autoSuggestUsers(req, res) {
    const { loginSubstring, limit } = req.query;
    const sliceStartPosition = 0;
    const sortedUsers = this.users.sort((a, b) => a.login.localeCompare(b.login));
    const filteredBySubstringUsers = sortedUsers.filter(user => user.login.includes(loginSubstring));
    const requestedAmountOfUsers = filteredBySubstringUsers.slice(sliceStartPosition, limit);
    res.status(statusCodes.ok).json(requestedAmountOfUsers);
  }

  removeUser(req, res) {
    const user = this.findUser(req.params.id);
    const updatedUser = { ...user, isDeleted: true };
    this.updateUsers(updatedUser);
    res.status(statusCodes.ok).json('success');
  }
}

export default new User();

