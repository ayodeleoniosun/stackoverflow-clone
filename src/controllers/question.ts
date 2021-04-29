import { Promise } from "bluebird";
import QuestionService from "../services/question";
import statusCodes from "../constants/statusCodes";

const questionController = {
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
