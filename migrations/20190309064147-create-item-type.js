"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ItemTypes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemId: {
        type: Sequelize.INTEGER
      },
      typeId: {
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
    .then(() => queryInterface.addIndex("ItemTypes", ["itemId"]))
    .then(() => queryInterface.addIndex("ItemTypes", ["typeId"]));;
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("ItemTypes");
  }
};