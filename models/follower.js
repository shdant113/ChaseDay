'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {
    date: DataTypes.DATE
  }/*, {}*/);
  Follower.associate = function(models) {
    // associations can be defined here
    Follower.belongsTo(models.User, {
    	foreignKey: 'user_id',
    	onDelete: 'CASCADE'
    })
  };
  return Follower;
};