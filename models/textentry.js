'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TextEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TextEntry.init({
    text: DataTypes.STRING,
    emotion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TextEntry',
  });
  return TextEntry;
};