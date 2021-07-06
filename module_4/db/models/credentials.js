'use strict';
import Sequelize from 'sequelize';

export default (sequelize, DataTypes) => {
  class Credentials extends Sequelize.Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {

    }
  }

  Credentials.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Credentials',
    timestamps: false,
  });

  return Credentials;
};
