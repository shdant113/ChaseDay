'use strict';
module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    content: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: null
    },
    thumbnail: {
      type: DataTypes.BLOB,
      defaultValue: null
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});
  Log.associate = function(models) {
    // associations can be defined here
    Log.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
    Log.hasMany(models.Comment, {
      foreignKey: 'commentId',
      as: 'comments'
    })
    Log.hasMany(models.Image, {
      foreignKey: 'imageId',
      as: 'images'
    })
    Log.hasMany(models.Rating, {
      foreignKey: 'ratingId',
      as: 'ratings'
    })
  };
  return Log;
};