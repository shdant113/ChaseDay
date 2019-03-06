'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        // references: {
        //   model: 'User',
        //   key: 'id',
        //   as: 'userId'
        // }
      },
      logId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        // references: {
        //   model: 'Log',
        //   key: 'id',
        //   as: 'logId'
        // }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Comments');
  }
};