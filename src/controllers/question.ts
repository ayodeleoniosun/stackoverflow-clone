import QuestionService from "../services/question";
import statusCodes from "../constants/statusCodes";
import { pagination, totalPage } from "../helpers/tools";

const questionController = {
  index: async (req: any, res: any) => {
    try {
      const { page, ...rest } = req.query;
      const questionService = new QuestionService();
      const { count, rows } = await questionService.index({
        ...pagination(page),
        ...rest,
      });

      res.status(statusCodes.OK).send({
        count,
        data: rows,
        currentPage: parseInt(page && page.number, 10) || 1,
        totalPage: totalPage(count, page && page.size),
        success: true,
      });
    } catch (err: any) {
      res.status(statusCodes.BAD_REQUEST).send({
        message: err.message,
        success: false,
      });
    }
  },

  post: async (req: any, res: any) => {
    try {
      const questionService = new QuestionService(req.decoded);
      const data = await questionService.post(req.body);
      res.status(statusCodes.CREATED).send({
        data: data,
        message: "Question successfully posted",
        success: true,
      });
    } catch (err: any) {
      let statusCode: number;

      statusCode =
        err.type == "RESOURCE_ALREADY_EXIST"
          ? statusCodes.UNPROCESSABLE_ENTITY
          : statusCodes.BAD_REQUEST;

      res.status(statusCode).send({
        message: err.message,
        success: false,
      });
    }
  },

  reply: async (req: any, res: any) => {
    try {
      const questionService = new QuestionService(req.decoded);
      const data = await questionService.reply(req.params.id, req.body);
      res.status(statusCodes.CREATED).send({
        data: data,
        message: "Reply successfully posted",
        success: true,
      });
    } catch (err: any) {
      let statusCode: number;

      statusCode =
        err.type == "RESOURCE_ALREADY_EXIST"
          ? statusCodes.UNPROCESSABLE_ENTITY
          : statusCodes.BAD_REQUEST;

      res.status(statusCode).send({
        message: err.message,
        success: false,
      });
    }
  },

  replies: async (req: any, res: any) => {
    try {
      const { page, ...rest } = req.query;
      const questionService = new QuestionService();
      const { count, rows } = await questionService.replies(req.params.id, {
        ...pagination(page),
        ...rest,
      });
      res.status(statusCodes.OK).send({
        count,
        data: rows,
        currentPage: parseInt(page && page.number, 10) || 1,
        totalPage: totalPage(count, page && page.size),
        success: true,
      });
    } catch (err: any) {
      res.status(statusCodes.BAD_REQUEST).send({
        message: err.message,
        success: false,
      });
    }
  },
};

export default questionController;
