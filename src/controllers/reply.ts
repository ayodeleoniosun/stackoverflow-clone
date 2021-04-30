import { Promise } from "bluebird";
import ReplyService from "../services/reply";
import statusCodes from "../constants/statusCodes";

const replyService = new ReplyService();

const replyController = {
  show: (req, res) => {
    Promise.try(() => replyService.show(req.params.id))
      .then((data) => {
        res.status(statusCodes.OK).send({
          data: data,
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

  rating: (req, res) => {
    Promise.try(() => replyService.rating(req.params.id))
      .then((data) => {
        res.status(statusCodes.OK).send({
          data: data,
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

  rate: (req, res) => {
    const replyService = new ReplyService(req.decoded);
    Promise.try(() => replyService.rate(req.params.id, req.body))
      .then((data: any) => {
        res.status(statusCodes.CREATED).send({
          data: data.rating,
          message: `Reply ${data.type}`,
          success: true,
        });
      })
      .catch((err) => {
        let statusCode: number;

        if (err.type == "RESOURCE_NOT_FOUND") {
          statusCode = statusCodes.NOT_FOUND;
        } else if (
          err.type == "RESOURCE_ALREADY_EXIST" ||
          err.type == "INVALID_RATING_TYPE"
        ) {
          statusCode = statusCodes.UNPROCESSABLE_ENTITY;
        } else {
          statusCode = statusCodes.BAD_REQUEST;
        }

        res.status(statusCode).send({
          message: err.message,
          success: false,
        });
      });
  },
};

export default replyController;
