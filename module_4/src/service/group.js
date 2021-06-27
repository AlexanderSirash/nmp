import { GroupQuery } from '../query/index.js';
import { groupModel } from '../model/index.js';
import { LogService, ModelService } from './index.js';

class Group extends LogService {
  constructor() {
    super();
    this.query = new GroupQuery();
  }

  findById(id) {
    return this.query.getGroup(id);
  }

  async checkIsGroupExist(id) {

    return !!await this.findById(id);
  }

  getGroup(id) {
    return this.findById(id);
  }

  addGroup(groupData) {
    const filterGroupData = ModelService.filterModel(groupModel, groupData);

    return this.query.addGroup(filterGroupData);
  }

  updatedGroup(dataForUpdate, id) {
    const filteredDataForUpdate = ModelService.filterModel(groupModel, dataForUpdate);

    return this.query.updatedGroup(filteredDataForUpdate, id);
  }

  getAllGroups() {
    return this.query.getAllGroups();
  }

  removeGroup(id) {
    return this.query.removeGroup(id);
  }
}

export default new Group();

