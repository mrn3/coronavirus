"use strict";

module.exports = (sequelize, DataTypes) => {
  
  const SeriesBrand = sequelize.define(
    "SeriesBrand", 
    {
      seriesId: DataTypes.INTEGER,
      brandId: DataTypes.INTEGER
    }, 
    {}
  );

  SeriesBrand.associate = function(models) {
    // associations can be defined here
  };

  return SeriesBrand;
};