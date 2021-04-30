"use strict";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "./instance";
import { Question } from "./question";
import { User } from "./user";
export class Reply extends Model {
  public id!: number;
  public question_id!: number;
  public user_id!: number;
  public reply!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export interface PostReplyModel {
  user_id: number;
  question_id: number;
  reply: string;
}

export const ReplyAttributes: any = ["id", "reply", "createdAt", "updatedAt"];

Reply.init(
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

    question_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    reply: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Reply",
  }
);

Question.hasMany(Reply, {
  foreignKey: "question_id",
  as: "reply",
});

Reply.belongsTo(Question, {
  foreignKey: "question_id",
  as: "question",
  onDelete: "CASCADE",
});

User.hasMany(Reply, {
  foreignKey: "question_id",
  as: "reply",
});

Reply.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE",
});
