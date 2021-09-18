const { DataTypes } = require('sequelize');

// Platform
module.exports = (sequelize) => {
  sequelize.define('platform', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  });
};
