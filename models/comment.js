'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
    	type: DataTypes.TEXT,
    	allowNull: false
    }
  }/*, {}*/);
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, {
    	foreignKey: 'userId',
    	onDelete: 'CASCADE'
    })
    Comment.belongsTo(models.Log, {
    	foreignKey: 'logId',
    	onDelete: 'CASCADE'
    })
  };
  return Comment;
};