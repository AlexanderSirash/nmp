'use strict';
import Sequelize from 'sequelize';

export default (sequelize, DataTypes) => {
  class Group extends Sequelize.Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      this.belongsToMany(models.User, {
        through: models.UserGroup,
        foreignKey: 'group_id',
      });

    }
  }

  Group.init({
    name: DataTypes.STRING,
    permissions: DataTypes.ARRAY(DataTypes.STRING),
  }, {
    sequelize,
    modelName: 'Group',
    timestamps: false,
  });

  return Group;
};
