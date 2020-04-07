"use strict";

module.exports = (sequelize, DataTypes) => {
  const ItemType = sequelize.define(
    "ItemType", 
    {
      itemId: DataTypes.INTEGER,
      typeId: DataTypes.INTEGER
    }, 
    {}
  );

  ItemType.associate = function(models) {
    // associations can be defined here
  };
  
  return ItemType;
};