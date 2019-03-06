'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: DataTypes.STRING,
    profilePhoto: DataTypes.BLOB,
    coverPhoto: DataTypes.BLOB,
    bio: {
      defaultValue: null,
      type: DataTypes.TEXT,
    },
    facebook: {
      defaultValue: null,
      type: DataTypes.STRING,
    },
    twitter: {
      defaultValue: null,
      type: DataTypes.STRING,
    },
    youtube: {
      defaultValue: null,
      type: DataTypes.STRING,
    },
    signature: {
      defaultValue: null,
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'active'
    }
  }/*, {}*/);
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Log, {
      foreignKey: 'logId',
      as: 'logs'
    })
    User.hasMany(models.Comment, {
      foreignKey: 'commentId',
      as: 'comments'
    })
    User.hasMany(models.Image, {
      foreignKey: 'imageId',
      as: 'images'
    })
    User.hasMany(models.Rating, {
      foreignKey: 'ratingId',
      as: 'ratings'
    })
    User.hasMany(models.Follower, {
      foreignKey: 'followerId',
      as: 'followers'
    })
    User.hasMany(models.Follow, {
      foreignKey: 'followId',
      as: 'follows'
    })
    User.hasMany(models.Message, {
      foreignKey: 'messageId',
      as: 'messages'
    })
  };
  return User;
};