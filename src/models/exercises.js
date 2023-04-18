'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercises extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Exercises.belongsTo(models.Users, {
        foreignKey: 'user_id'
      })
    }
  }
  Exercises.init({
    user_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    name: DataTypes.STRING,
    interval: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Exercises',
  });
  return Exercises;
};