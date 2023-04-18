'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nutritions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Nutritions.belongsTo(models.Users, {
        foreignKey: 'user_id'
      })
    }
  }
  Nutritions.init({
    user_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Nutritions',
  });
  return Nutritions;
};