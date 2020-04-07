"use strict";

module.exports = (sequelize, DataTypes) => {
  
  const Series = sequelize.define(
    "Series",
    {
      name: DataTypes.STRING
    },
    {}
  );

  Series.associate = function (models) {

    Series.belongsToMany(models.Brand, {
      through: "SeriesBrands",
      as: "brands",
      foreignKey: "seriesId"
    });

    Series.belongsToMany(models.Item, {
      through: "ItemSeries",
      as: "items",
      foreignKey: "seriesId"
    });

  };

  return Series;
};