"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("LocationItems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      locationId: {
        type: Sequelize.INTEGER
      },
      itemId: {
        type: Sequelize.INTEGER
      },
      serialNumber: {
        type: Sequelize.STRING
      },
      purchasedAt: {
        type: Sequelize.DATE
      },
      purchasePrice: {
        type: Sequelize.DECIMAL(10, 2)
      },
      warrantyDetail: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("LocationItems");
  }
};