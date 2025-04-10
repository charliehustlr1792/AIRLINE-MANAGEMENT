'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BOOKINGS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BOOKINGS.init({
    flightId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    noofSeats: DataTypes.INTEGER,
    totalCost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BOOKINGS',
  });
  return BOOKINGS;
};