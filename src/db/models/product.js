'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    user_id: DataTypes.NUMBER,
    category_id: DataTypes.NUMBER,
    image: DataTypes.STRING,
    brand: DataTypes.STRING,
    front: DataTypes.STRING,
    product_id: DataTypes.NUMBER,
    product_line: DataTypes.STRING,
    price: DataTypes.NUMBER,
    discount_rate: DataTypes.NUMBER,
    general_info: DataTypes.JSON,
    option: DataTypes.JSON,
    stock: DataTypes.NUMBER,
    sell_number: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};