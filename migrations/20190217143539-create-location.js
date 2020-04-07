"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Locations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      placeId: {
        type: Sequelize.STRING
      },
      formattedAddress: {
        type: Sequelize.STRING
      },
      addressComponents: {
        type: Sequelize.JSON
      },
      lat: {
        type: Sequelize.FLOAT
      },
      lng: {
        type: Sequelize.FLOAT
      },
      position: {
        type: Sequelize.GEOGRAPHY('POINT', 4326)
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
    .then(() => queryInterface.addIndex("Locations", ["placeId"]));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Locations");
  }
};