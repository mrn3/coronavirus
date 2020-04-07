"use strict";

module.exports = (sequelize, DataTypes) => {

  const UserLocation = sequelize.define(
    "UserLocation", 
    {
      userId: DataTypes.INTEGER,
      locationId: DataTypes.INTEGER
    }, 
    {}
  );

  UserLocation.associate = function(models) {
    // associations can be defined here
  };
  
  return UserLocation;
};