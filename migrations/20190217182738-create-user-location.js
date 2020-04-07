"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("UserLocations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      locationId: {
        type: Sequelize.INTEGER
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
    .then(() => queryInterface.addIndex("UserLocations", ["userId"]))
    .then(() => queryInterface.addIndex("UserLocations", ["locationId"]));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("UserLocations");
  }
};