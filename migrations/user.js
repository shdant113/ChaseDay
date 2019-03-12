'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING
      },
      profilePhoto: {
        type: Sequelize.STRING
      },
      coverPhoto: {
        type: Sequelize.STRING
      },
      profileVideo: {
        type: Sequelize.STRING
      }
      bio: {
        type: Sequelize.TEXT,
        defaultValue: null
      },
      facebook: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      twitter: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      youtube: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      signature: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      type: {
        type: Sequelize.STRING,
        defaultValue: 'active'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};