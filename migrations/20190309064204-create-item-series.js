"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ItemSeries", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemId: {
        type: Sequelize.INTEGER
      },
      seriesId: {
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
    .then(() => queryInterface.addIndex("ItemSeries", ["itemId"]))
    .then(() => queryInterface.addIndex("ItemSeries", ["seriesId"]));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("ItemSeries");
  }
};