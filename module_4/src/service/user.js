import { userModel } from '../model/index.js';
import { UserQuery } from '../query/index.js';
import { LogService, ModelService } from './index.js';

class User extends LogService {
  constructor() {
    super();
    this.query = new UserQuery();
  }

  findById(id) {
    return this.query.getUser(id);
  }

  async checkIsUserExist(id) {
    return !!await this.findById(id);
  }

  getUser(id) {
    return this.findById(id);
  }

  addUser(userData) {
    const filteredUserData = ModelService.filterModel(userModel, userData);

    return this.query.addUser(filteredUserData);
  }

  updateUser(dataForUpdate, id) {
    const filteredDataForUpdate = ModelService.filterModel(userModel, dataForUpdate);

    return this.query.updateUser(filteredDataForUpdate, id);
  }

  autoSuggestUsers(reqQuery) {
    return this.query.autoSuggestUsers(reqQuery);
  }

  removeUser(id) {
    return this.query.updateUser({ isDeleted: true }, id).then(() => 'success');
  }

}

export default new User();

