'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      login: 'John',
      password: 'doe',
      age: '20',
      isDeleted: false,
    },
      {
        login: 'Joan',
        password: 'doe',
        age: '20',
        isDeleted: false,
      }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
