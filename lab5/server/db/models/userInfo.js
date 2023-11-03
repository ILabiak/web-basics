'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInfo extends Model {
    static associate(models) {
      UserInfo.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'userinfo_userid_fk',
        onDelete: 'cascade',
      });
    }
  }
  UserInfo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pib: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      variant: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      faculty: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UserInfo',
      tableName: 'users_info',
      timestamps: false
    },
  );
  return UserInfo;
};
