import { userModel } from '../model/user.js';
import { v4 as uuidv4 } from 'uuid';
import Model from './Model.js';

class User {
  constructor() {
    this.users = [];

  }

  findById(id) {
    return this.users.find(user => user.id === id);
  }

  updateUsers(updatedUser) {
    this.users = this.users.map(user => (user.id === updatedUser.id ? updatedUser : user));

    return this.users;
  }

  checkIsUserExist(id) {
    return !!this.findById(id);
  }

  getUser(id) {
    return this.findById(id);
  }

  addUser(body) {
    const user = Model.filterModel(userModel, body);
    const id = uuidv4();
    this.users.push({ id, ...user, isDeleted: false });

    return id;
  }

  updateUser(body, id) {
    const user = this.findById(id);
    const updatedUser = { ...user, ...Model.filterModel(userModel, body) };
    this.updateUsers(updatedUser);

    return updatedUser;
  }

  autoSuggestUsers(query) {
    const { loginSubstring, limit } = query;
    const sliceStartPosition = 0;
    const sortedUsers = this.users.sort((a, b) => a.login.localeCompare(b.login));
    const filteredBySubstringUsers = sortedUsers.filter(user => user.login.includes(loginSubstring));
    const requestedAmountOfUsers = filteredBySubstringUsers.slice(sliceStartPosition, limit);

    return requestedAmountOfUsers;
  }

  removeUser(id) {
    const user = this.findById(id);
    const updatedUser = { ...user, isDeleted: true };
    this.updateUsers(updatedUser);

    return 'success';
  }
}

export default new User();

