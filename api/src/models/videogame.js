const { DataTypes } = require('sequelize');

// Game
module.exports = (sequelize) => {
  sequelize.define('videogame', {
    //id: {
      //type: DataTypes.INTEGER,
      //primaryKey: true,
    //},
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
    rawgId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    /*
     * creo que platforms debe tener su propia tabla
    platforms: {

    },
    */ 
  });
};
