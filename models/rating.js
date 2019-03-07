'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    type: DataTypes.ENUM('up', 'down')
  }/*, {}*/);
  Rating.associate = function(models) {
    // associations can be defined here
    Rating.belongsTo(models.Log, {
    	foreignKey: 'log_id',
    	onDelete: 'CASCADE'
    })
    Rating.belongsTo(models.User, {
    	foreignKey: 'user_id',
    	onDelete: 'CASCADE'
    })
  };
  return Rating;
};