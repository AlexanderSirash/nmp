'use strict';
import Sequelize from 'sequelize';

export default (sequelize) => {
  class UserGroup extends Sequelize.Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }

  UserGroup.init({}, {
    sequelize,
    modelName: 'UserGroup',
    timestamps: false,
  });

  return UserGroup;
};
