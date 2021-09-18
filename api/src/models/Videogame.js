const { DataTypes } = require('sequelize');

// Game
module.exports = (sequelize) => {
  sequelize.define('Game', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    /*
     * creo que platforms debe tener su propia tabla
    platforms: {

    },
    */ 
  });
};
