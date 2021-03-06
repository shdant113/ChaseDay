'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePhoto: {
      type: DataTypes.STRING,
      defaultValue: 'https://i.pinimg.com/originals/54/63/18/5463185be38511d42a9f253f57cd0f98.png'
    },
    coverPhoto: {
      type: DataTypes.STRING,
      defaultValue: 'https://puu.sh/CYV0a/25d0034486.png'
    },
    profileVideo: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    bio: {
      defaultValue: "I haven't filled in my bio yet, but I will soon!",
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
      foreignKey: 'log_id',
      as: 'logs'
    })
    User.hasMany(models.Comment, {
      foreignKey: 'comment_id',
      as: 'comments'
    })
    User.hasMany(models.Image, {
      foreignKey: 'image_id',
      as: 'images'
    })
    User.hasMany(models.Rating, {
      foreignKey: 'rating_id',
      as: 'ratings'
    })
    User.hasMany(models.Follower, {
      foreignKey: 'follower_id',
      as: 'followers'
    })
    User.hasMany(models.Follow, {
      foreignKey: 'follow_id',
      as: 'follows'
    })
    User.hasMany(models.Message, {
      foreignKey: 'message_id',
      as: 'messages'
    })
  };
  return User;
};