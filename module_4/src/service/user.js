import { userModel } from '../model/user.js';
import query from '../query/user.js';
import Model from './model.js';

class User {

  findById(id) {
    return query.getUser(id);
  }

  async checkIsUserExist(id) {
    return !!await this.findById(id);
  }

  getUser(id) {
    return this.findById(id);
  }

  addUser(userData) {
    const filteredUserData = Model.filterModel(userModel, userData);

    return query.addUser(filteredUserData);
  }

  updateUser(dataForUpdate, id) {
    const filteredDataForUpdate = Model.filterModel(userModel, dataForUpdate);

    return query.updateUser(filteredDataForUpdate, id);
  }

  autoSuggestUsers(reqQuery) {
    return query.autoSuggestUsers(reqQuery);
  }

  removeUser(id) {
    return query.updateUser({ isDeleted: true }, id).then(() => 'success');
  }

}

export default new User();

