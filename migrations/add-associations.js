'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Logs',
      'user_id',
      {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Logs',
      'user_id'
    )
  }
};
