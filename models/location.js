"use strict";

module.exports = (sequelize, DataTypes) => {
  
  const Location = sequelize.define(
    "Location", 
    {
      placeId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      formattedAddress: DataTypes.STRING,
      addressComponents: DataTypes.JSON,
      lat: DataTypes.FLOAT,
      lng: DataTypes.FLOAT,
      position: DataTypes.GEOGRAPHY('POINT', 4326)
    }, 
    {}
  );

  Location.associate = function (models) {

    Location.belongsToMany(models.User, {
      through: "UserLocations",
      as: "users",
      foreignKey: "locationId"
    });

    Location.belongsToMany(models.Item, {
      through: "LocationItems",
      as: "items",
      foreignKey: "locationId"
    });

  };

  return Location;
  
};