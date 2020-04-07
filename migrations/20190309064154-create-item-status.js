"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ItemStatuses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemId: {
        type: Sequelize.INTEGER
      },
      statusId: {
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
    .then(() => queryInterface.addIndex("ItemStatuses", ["itemId"]))
    .then(() => queryInterface.addIndex("ItemStatuses", ["statusId"]));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("ItemStatuses");
  }
};