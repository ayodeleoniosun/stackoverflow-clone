import { Promise } from "bluebird";
import QuestionService from "../services/question";
import statusCodes from "../constants/statusCodes";
import { pagination, totalPage } from "../helpers/tools";

const questionController = {
  index: (req, res) => {
    const { page, ...rest } = req.query;
    const questionService = new QuestionService();
    Promise.try(() => questionService.index({ ...pagination(page), ...rest }))
      .then(({ count, rows }) => {
        res.status(statusCodes.OK).send({
          count,
          data: rows,
          currentPage: parseInt(page && page.number, 10) || 1,
          totalPage: totalPage(count, page && page.size),
          success: true,
        });
      })
      .catch((err) => {
        res.status(statusCodes.BAD_REQUEST).send({
          message: err.message,
          success: false,
        });
      });
  },

  post: (req, res) => {
    const questionService = new QuestionService(req.decoded);
    Promise.try(() => questionService.post(req.body))
      .then((data) => {
        res.status(statusCodes.CREATED).send({
          data: data,
          message: "Question successfully posted",
          success: true,
        });
      })
      .catch((err) => {
        let statusCode: number;

        statusCode =
          err.type == "RESOURCE_ALREADY_EXIST"
            ? statusCodes.UNPROCESSABLE_ENTITY
            : statusCodes.BAD_REQUEST;

        res.status(statusCode).send({
          message: err.message,
          success: false,
        });
      });
  },
};

export default questionController;
