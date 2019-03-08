'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: {
    	type: DataTypes.TEXT,
    	allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }/*, {}*/);
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.User, {
      foreignKey: 'recip_id'
    })
    Message.belongsTo(models.User, {
      foreignKey: 'sender_id'
    })
  };
  return Message;
};