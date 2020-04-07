"use strict";

module.exports = (sequelize, DataTypes) => {
  
  const ItemStatus = sequelize.define(
    "ItemStatus", 
      {
      itemId: DataTypes.INTEGER,
      statusId: DataTypes.INTEGER
    }, 
    {}
  );

  ItemStatus.associate = function(models) {
    // associations can be defined here
  };
  
  return ItemStatus;
};