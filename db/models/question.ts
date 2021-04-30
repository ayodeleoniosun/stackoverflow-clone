"use strict";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "./instance";
import { User } from "./user";
export class Question extends Model {
  public id!: number;
  public user_id!: number;
  public title!: string;
  public description!: string;
  public tags?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export interface PostQuestionModel {
  user_id: number;
  title: string;
  description: string;
  tags: string | null;
}

export const QuestionAttributes: any = [
  "id",
  "title",
  "description",
  "tags",
  "subscribe",
  "createdAt",
  "updatedAt",
];

Question.init(
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

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    subscribe: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    tags: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Question",
  }
);

User.hasMany(Question, {
  foreignKey: "user_id",
  as: "question",
});

Question.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE",
});
