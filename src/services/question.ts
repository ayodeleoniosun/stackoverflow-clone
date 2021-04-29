import { User } from "../../db/models/user";
import {
  Question,
  PostQuestionModel,
  QuestionAttributes,
} from "../../db/models/question";

import customErrorCodes from "../constants/customErrorCodes";
import { CustomError } from "../helpers/errors";

export class QuestionService {
  currentUser: any;
  include: any;

  constructor(currentUser?: any) {
    this.currentUser = currentUser;
    this.include = [{ model: User, as: "user" }];
  }

  async index({ limit, offset, ...rest }) {
    const query = { ...rest };
    return await Question.findAndCountAll({
      where: query,
      attributes: QuestionAttributes,
      include: this.include,
      order: [["updatedAt", "DESC"]],
      limit,
      offset,
    });
  }

  async post(payload: PostQuestionModel) {
    const { title, description, tags } = payload;

    let payloadObject: PostQuestionModel = {
      user_id: this.currentUser.id,
      title: title,
      description: description,
      tags: tags,
    };

    const question = await this.getQuestion({
      user_id: payloadObject.user_id,
      title: payloadObject.title,
    });

    if (question)
      throw new CustomError(
        "You have posted this question before",
        customErrorCodes.RESOURCE_ALREADY_EXIST
      );

    return Question.create(payloadObject).then((question) =>
      this.getQuestion({ id: question.id })
    );
  }

  async getQuestion(column: object) {
    return await Question.findOne({
      attributes: QuestionAttributes,
      include: this.include,
      where: column,
    });
  }
}

export default QuestionService;
