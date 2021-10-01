const { DataTypes } = require('sequelize');

// Platform
module.exports = (sequelize) => {
  sequelize.define('platform', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
    },
  });
};
