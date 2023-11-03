'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Session, {
        onDelete: 'cascade',
        foreignKey: 'user_id',
        as: 'sessions_userid_fk'
      });
      User.hasOne(models.UserInfo, {
        onDelete: 'cascade',
        foreignKey: 'user_id',
        as: 'userinfo_userid_fk',
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Must be a valid email address',
          },
        },
      },
      passhash: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: false,
    }
  );
  return User;
};
