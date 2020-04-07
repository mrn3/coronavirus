"use strict";

module.exports = (sequelize, DataTypes) => {
  
  const Item = sequelize.define(
    "Item", 
    {
      modelNumber: DataTypes.STRING,
      brandSeriesModel: DataTypes.STRING
    }, 
    {}
  );

  Item.associate = function (models) {

    Item.belongsToMany(models.Location, {
      through: "LocationItems",
      as: "locations",
      foreignKey: "itemId"
    });

    Item.belongsToMany(models.Series, {
      through: "ItemSeries",
      as: "series",
      foreignKey: "itemId"
    });

    Item.belongsToMany(models.Status, {
      through: "ItemStatuses",
      as: "statuses",
      foreignKey: "itemId"
    });

    Item.belongsToMany(models.Type, {
      through: "ItemTypes",
      as: "types",
      foreignKey: "itemId"
    });

  };

  return Item;
  
};