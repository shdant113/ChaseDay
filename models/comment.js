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
    	foreignKey: 'user_id',
    	onDelete: 'CASCADE'
    })
    Comment.belongsTo(models.Log, {
    	foreignKey: 'log_id',
    	onDelete: 'CASCADE'
    })
  };
  return Comment;
};