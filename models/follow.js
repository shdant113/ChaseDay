'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    date: DataTypes.DATE
  }, {});
  Follow.associate = function(models) {
    // associations can be defined here
    Follow.belongsTo(models.User, {
    	foreignKey: 'userId',
    	onDelete: 'CASCADE'
    })
  };
  return Follow;
};