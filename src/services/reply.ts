import { User } from "../db/models/user";
import { Reply, ReplyAttributes } from "../db/models/reply";
import {
  RateModel,
  Rating,
  RatingAttributes,
  RatingType,
} from "../db/models/rating";
import { Question } from "../db/models/question";
import customErrorCodes from "../constants/customErrorCodes";
import { CustomError } from "../helpers/errors";

export class ReplyService {
  currentUser: any;
  replyInclude: any;
  ratingInclude: any;
  ratingType: string;

  constructor(currentUser?: any) {
    this.currentUser = currentUser;

    this.replyInclude = [
      { model: Question, as: "question" },
      { model: User, as: "user" },
    ];

    this.ratingInclude = [
      { model: Reply, as: "reply" },
      { model: User, as: "user" },
    ];
  }

  async show(replyId: number) {
    return await this.getReply({ id: replyId });
  }

  async rating(replyId: number) {
    const upVotes = await this.countRating({
      reply_id: replyId,
      rating: RatingType.UP_VOTE,
    });

    const downVotes = await this.countRating({
      reply_id: replyId,
      rating: RatingType.DOWN_VOTE,
    });

    return {
      up_votes: upVotes,
      down_votes: downVotes,
    };
  }

  async rate(replyId: number, payload: RateModel) {
    const { rating } = payload;
    const isValidRating =
      rating == RatingType.UP_VOTE || rating == RatingType.DOWN_VOTE;

    if (!isValidRating)
      throw new CustomError(
        "Invalid rating type.",
        customErrorCodes.INVALID_RATING_TYPE
      );

    const reply = await this.getReply({ id: replyId });

    if (!reply)
      throw new CustomError(
        "Invalid record.",
        customErrorCodes.RESOURCE_NOT_FOUND
      );

    this.ratingType = rating === RatingType.UP_VOTE ? "up voted" : "down voted";

    const ratingExists = await this.getRating({
      reply_id: replyId,
      user_id: this.currentUser.id,
      rating: rating,
    });

    if (ratingExists)
      throw new CustomError(
        `You have already ${this.ratingType} this reply`,
        customErrorCodes.RESOURCE_ALREADY_EXIST
      );

    let payloadObject: RateModel = {
      user_id: this.currentUser.id,
      reply_id: replyId,
      rating,
    };

    const response = await Rating.create(payloadObject);

    return {
      rating: await this.getRating({ id: response.id }),
      type: this.ratingType,
    };
  }

  async getReply(column: object) {
    return await Reply.findOne({
      attributes: ReplyAttributes,
      include: this.replyInclude,
      where: column,
    });
  }

  async getRating(column: object) {
    return await Rating.findOne({
      attributes: RatingAttributes,
      include: this.ratingInclude,
      where: column,
    });
  }

  async countRating(column: object) {
    return await Rating.count({
      where: column,
    });
  }
}

export default ReplyService;
