"use strict";

module.exports = (sequelize, DataTypes) => {
  
  const ItemSeries = sequelize.define(
    "ItemSeries", 
    {
      itemId: DataTypes.INTEGER,
      seriesId: DataTypes.INTEGER
    }, 
    {}
  );
  
  ItemSeries.associate = function(models) {
    // associations can be defined here
  };
  
  return ItemSeries;
};