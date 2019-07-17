'use strict';

module.exports = {
  up: queryInterface => queryInterface.removeColumn('users', 'username'),

  down: (queryInterface, Sequelize) => queryInterface.addColumn('users', 'username', Sequelize.STRING)
};
