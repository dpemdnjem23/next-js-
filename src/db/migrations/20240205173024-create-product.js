'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.NUMBER
      },
      category_id: {
        type: Sequelize.NUMBER
      },
      image: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING
      },
      front: {
        type: Sequelize.STRING
      },
      product_id: {
        type: Sequelize.NUMBER
      },
      product_line: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.NUMBER
      },
      discount_rate: {
        type: Sequelize.NUMBER
      },
      general_info: {
        type: Sequelize.JSON
      },
      option: {
        type: Sequelize.JSON
      },
      stock: {
        type: Sequelize.NUMBER
      },
      sell_number: {
        type: Sequelize.NUMBER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};