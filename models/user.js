"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define(
    "User", 
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, 
    {
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        },
        beforeUpdate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    }
  );

  User.associate = function (models) {
    User.belongsToMany(models.Location, {
      through: "UserLocations",
      as: "locations",
      foreignKey: "userId"
    });
  }; 

  User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  }

  User.prototype.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
  
    return jwt.sign(
      {
        id: this.id,
        email: this.email,
        exp: parseInt(expirationDate.getTime() / 1000, 10)
      }, 
    "secret");
  }
  
  User.prototype.toAuthJSON = function() {
    return {
      id: this.id,
      email: this.email,
      token: this.generateJWT()
    };
  };

  return User;
};