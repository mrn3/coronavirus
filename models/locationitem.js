"use strict";

module.exports = (sequelize, DataTypes) => {

  const LocationItem = sequelize.define(
    "LocationItem", 
    {
      locationId: DataTypes.INTEGER,
      itemId: DataTypes.INTEGER,
      serialNumber: DataTypes.STRING,
      purchasedAt: DataTypes.DATE,
      purchasePrice: DataTypes.DECIMAL(10,2),
      warrantyDetail: DataTypes.STRING
    }, 
    {}
  );

  LocationItem.associate = function(models) {
    // associations can be defined here
  };
  
  return LocationItem;
};