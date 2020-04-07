"use strict";

module.exports = (sequelize, DataTypes) => {
  
  const Status = sequelize.define(
    "Status", 
    {
      name: DataTypes.STRING
    }, 
    {}
  );

  Status.associate = function(models) {

    Status.belongsToMany(models.Item, {
      through: "ItemStatuses",
      as: "items",
      foreignKey: "statusId"
    });

  };

  return Status;
};