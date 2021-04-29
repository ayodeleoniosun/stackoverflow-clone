import { User } from "../../db/models/user";
import {
  Question,
  PostQuestionModel,
  QuestionAttributes,
} from "../../db/models/question";

import customErrorCodes from "../constants/customErrorCodes";
import { CustomError } from "../helpers/errors";
import { Reply, PostReplyModel, ReplyAttributes } from "../../db/models/reply";

export class QuestionService {
  currentUser: any;
  questionInclude: any;
  replyInclude: any;

  constructor(currentUser?: any) {
    this.currentUser = currentUser;
    this.questionInclude = [{ model: User, as: "user" }];
    this.replyInclude = [
      { model: Question, as: "question" },
      { model: User, as: "user" },
    ];
  }

  async index({ limit, offset, ...rest }) {
    const query = { ...rest };
    return await Question.findAndCountAll({
      where: query,
      attributes: QuestionAttributes,
      include: this.questionInclude,
      order: [["updatedAt", "DESC"]],
      limit,
      offset,
    });
  }

  async post(payload: PostQuestionModel) {
    const { title, description, tags } = payload;

    const question = await this.getQuestion({
      user_id: this.currentUser.id,
      title: title,
    });

    if (question)
      throw new CustomError(
        "You have posted this question before",
        customErrorCodes.RESOURCE_ALREADY_EXIST
      );

    let payloadObject: PostQuestionModel = {
      user_id: this.currentUser.id,
      title,
      description,
      tags,
    };

    return Question.create(payloadObject).then((question) =>
      this.getQuestion({ id: question.id })
    );
  }

  async reply(question_id: number, payload: PostReplyModel) {
    const { reply } = payload;

    const question = await this.getQuestion({
      id: question_id,
    });

    if (!question)
      throw new CustomError(
        "Question does not exist",
        customErrorCodes.RESOURCE_ALREADY_EXIST
      );

    const reply_exists = await this.getReply({
      user_id: this.currentUser.id,
      question_id,
      reply,
    });

    if (reply_exists)
      throw new CustomError(
        "You have posted this reply to this question before",
        customErrorCodes.RESOURCE_ALREADY_EXIST
      );

    let payloadObject: PostReplyModel = {
      user_id: this.currentUser.id,
      question_id,
      reply,
    };

    return Reply.create(payloadObject).then((reply) =>
      this.getReply({ id: reply.id })
    );
  }

  async replies(question_id, { limit, offset, ...rest }) {
    const query = { question_id: question_id, ...rest };
    return await Reply.findAndCountAll({
      where: query,
      attributes: ReplyAttributes,
      include: this.replyInclude,
      order: [["updatedAt", "DESC"]],
      limit,
      offset,
    });
  }

  async getQuestion(column: object) {
    return await Question.findOne({
      attributes: QuestionAttributes,
      include: this.questionInclude,
      where: column,
    });
  }

  async getReply(column: object) {
    return await Reply.findOne({
      attributes: ReplyAttributes,
      include: this.replyInclude,
      where: column,
    });
  }
}

export default QuestionService;
