"use strict";
import Sequelize from "sequelize";
import { sequelize } from "./instance";
import * as bcrypt from "bcrypt";

export interface UserAddModel {
  id: number;
  display_name: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UserModel extends Sequelize.Model<UserModel, UserAddModel> {
  id: number;
  display_name: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const UserAttributes: string[] = [
  "id",
  "display_name",
  "first_name",
  "last_name",
  "email",
];

export const User = sequelize.define<UserModel, UserAddModel>("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  display_name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

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
