"use strict";

module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define(
    "Brand", 
    {
      name: DataTypes.STRING
    }, 
    {}
  );

  Brand.associate = function(models) {

    Brand.belongsToMany(models.Series, {
      through: "SeriesBrands",
      as: "series",
      foreignKey: "brandId"
    });

  };
  return Brand;
};