'use strict';
import Sequelize from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Sequelize.Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      this.belongsToMany(models.Group, {
        through: models.UserGroup,
        foreignKey: 'user_id',
      });

    }
  }

  User.init({
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,
  });

  return User;
};
