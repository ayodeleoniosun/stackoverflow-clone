"use strict";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "./instance";

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
  "user_id",
  "title",
  "description",
  "tags",
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
