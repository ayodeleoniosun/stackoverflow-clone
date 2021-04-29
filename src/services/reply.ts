import { User } from "../../db/models/user";
import { Reply, ReplyAttributes } from "../../db/models/reply";
import { Question } from "../../db/models/question";

export class ReplyService {
  currentUser: any;
  replyInclude: any;

  constructor(currentUser?: any) {
    this.currentUser = currentUser;
    this.replyInclude = [
      { model: Question, as: "question" },
      { model: User, as: "user" },
    ];
  }

  async show(reply_id: number) {
    return await this.getReply({ id: reply_id });
  }

  async getReply(column: object) {
    return await Reply.findOne({
      attributes: ReplyAttributes,
      include: this.replyInclude,
      where: column,
    });
  }
}

export default ReplyService;
