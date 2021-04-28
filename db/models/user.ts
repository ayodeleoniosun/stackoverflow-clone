"use strict";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "./instance";
import * as bcrypt from "bcrypt";

export class User extends Model {
  public id!: number;
  public display_name!: string;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export interface UserRegisterModel {
  id: number;
  display_name: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UserLoginModel {
  email: string;
  password: string;
}

export const UserAttributes: any = [
  "id",
  "display_name",
  "first_name",
  "last_name",
  "email",
];

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    display_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

const saltRounds: number = 10;

User.beforeCreate((user) => {
  if (user.password) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(saltRounds)
    );
  }
});

User.beforeUpdate((user) => {
  if (user.changed("password"))
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(saltRounds)
    );
});
