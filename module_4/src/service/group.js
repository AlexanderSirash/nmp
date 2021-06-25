import query from '../query/group.js';
import Model from './model.js';
import { groupModel } from '../model/group.js';

class Group {

  findById(id) {
    return query.getGroup(id);
  }

  async checkIsGroupExist(id) {
    return !!await this.findById(id);
  }

  getGroup(id) {
    return this.findById(id);
  }

  addGroup(groupData) {
    const filterGroupData = Model.filterModel(groupModel, groupData);

    return query.addGroup(filterGroupData);
  }

  updatedGroup(dataForUpdate, id) {
    const filteredDataForUpdate = Model.filterModel(groupModel, dataForUpdate);

    return query.updatedGroup(filteredDataForUpdate, id);
  }

  getAllGroups() {
    return query.getAllGroups();
  }

  removeGroup(id) {
    return query.removeGroup(id);
  }
}

export default new Group();

