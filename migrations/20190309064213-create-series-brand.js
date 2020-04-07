"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("SeriesBrands", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      seriesId: {
        type: Sequelize.INTEGER
      },
      brandId: {
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
    .then(() => queryInterface.addIndex("SeriesBrands", ["seriesId"]))
    .then(() => queryInterface.addIndex("SeriesBrands", ["brandId"]));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("SeriesBrands");
  }
};