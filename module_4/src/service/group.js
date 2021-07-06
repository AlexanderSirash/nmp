import { groupModel } from '../model/index.js';
import { LogService, ModelService } from './index.js';

export class GroupService extends LogService {
  constructor(query) {
    super();
    this.query = query;
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

  updateGroup(dataForUpdate, id) {
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
