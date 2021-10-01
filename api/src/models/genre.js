const { DataTypes } = require('sequelize');

// Genre
module.exports = (sequelize) => {
  sequelize.define('genre', {
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
