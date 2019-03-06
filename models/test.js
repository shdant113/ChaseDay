'use strict';
module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('Test', {
    content: {
    	type: DataTypes.STRING,
    	allowNull: false
  	}
  });
  Test.associate = (models) => {
    // associations can be defined here
  };
  return Test;
};