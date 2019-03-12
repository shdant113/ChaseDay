module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
  Log.associate = (models) => {
    // associations can be defined here
    Log.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
      onDelete: 'CASCADE'
    })
    Log.hasMany(models.Comment, {
      foreignKey: 'comment_id',
      as: 'comment'
    })
    Log.hasMany(models.Image, {
      foreignKey: 'image_id',
      as: 'image'
    })
    Log.hasMany(models.Rating, {
      foreignKey: 'rating_id',
      as: 'rating'
    })
  };
  // console.log("\nhere is the log that was creataed")
  // console.log(Log)
  return Log;
// };
}
