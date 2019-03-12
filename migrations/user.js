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
        type: Sequelize.STRING,
        allowNull: false
      },
      profilePhoto: {
        type: Sequelize.STRING,
        defaultValue: 'https://i.pinimg.com/originals/54/63/18/5463185be38511d42a9f253f57cd0f98.png'
      },
      coverPhoto: {
        type: Sequelize.STRING,
        defaultValue: 'https://puu.sh/CYV0a/25d0034486.png'
      },
      profileVideo: {
        type: Sequelize.STRING
      }
      bio: {
        type: Sequelize.TEXT,
        defaultValue: "I haven't filled in my bio yet, but I will soon!"
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
      },
      logId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Log',
          key: 'id',
          as: 'logs'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};