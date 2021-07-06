'use strict';
import fs from 'fs';
import Sequelize from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';
import dbConfig from '../config/dbConfig.cjs';

class DB {
  constructor() {
    this.__filename = fileURLToPath(import.meta.url);
    this.config = dbConfig;
    this.connection = {};
  }

  async init() {
    const dotIndex = 0;
    const jsExtSize = -3;

    this.sequelize = new Sequelize(this.config.database, this.config.username, this.config.password, this.config);

    const fileNames = fs.readdirSync(`${path.dirname(this.__filename)}/models`)
    .filter(file => (
      file.indexOf('.') !== dotIndex) &&
      (file !== path.basename(this.__filename)) &&
      (file.slice(jsExtSize) === '.js'));

    await Promise.all(fileNames.map(filename => this.readModel(filename)));

    Object.keys(this.connection).forEach((modelName) => {
      if (this.connection[modelName].associate) {
        this.connection[modelName].associate(this.connection);
      }

      this.connection.sequelize = this.sequelize;
      this.connection.Sequelize = Sequelize;
    });
    console.log('Connection has been established successfully.');
  }

  async readModel(fileName) {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const modelFile = await import( path.join('file://', `${path.dirname(this.__filename)}/models`, fileName));
    const model = modelFile.default(this.sequelize, Sequelize.DataTypes);
    this.connection[model.name] = model;
  }
}

export default new DB();
