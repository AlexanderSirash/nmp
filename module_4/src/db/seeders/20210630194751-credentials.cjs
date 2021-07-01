'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Credentials', [{
      username: 'admin',
      password: 'admin!1',
      role: 'admin',
    },
      {
        username: 'test',
        password: 'test!1',
        role: 'user',
      }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Credentials', null, {});
  },
};
