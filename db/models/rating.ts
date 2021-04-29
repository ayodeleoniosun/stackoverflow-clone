"use strict";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "./instance";
import { Reply } from "./reply";
import { User } from "./user";

export class Rating extends Model {
  public id!: number;
  public reply_id!: number;
  public user_id!: number;
  public rating!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export interface PostRatingModel {
  user_id: number;
  reply_id: number;
  rating: string;
}

export const RatingAttributes: any = ["id", "rating", "createdAt", "updatedAt"];

Rating.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    reply_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    rating: {
      type: DataTypes.ENUM("up_vote", "down_vote"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Rating",
  }
);

Rating.belongsTo(Reply, {
  foreignKey: "reply_id",
  as: "reply",
  onDelete: "CASCADE",
});

Rating.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE",
});
