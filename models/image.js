'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
	data: DataTypes.BLOB,
	title: {
		type: DataTypes.STRING,
		defaultValue: null
	}
  }/*, {}*/);
  Image.associate = function(models) {
	// associations can be defined here
	Image.belongsTo(models.Log, {
		foreignKey: 'log_id',
		onDelete: 'CASCADE'
	})
	Image.belongsTo(models.User, {
		foreignKey: 'user_id',
		onDelete: 'CASCADE'
	})
  };
  return Image;
};