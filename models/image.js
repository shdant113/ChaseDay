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
		foreignKey: 'logId',
		onDelete: 'CASCADE'
	})
	Image.belongsTo(models.User, {
		foreignKey: 'userId',
		onDelete: 'CASCADE'
	})
  };
  return Image;
};