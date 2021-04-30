import ReplyService from "../services/reply";
import statusCodes from "../constants/statusCodes";

const replyService = new ReplyService();

const replyController = {
  show: async (req: any, res: any) => {
    try {
      const data = await replyService.show(req.params.id);
      res.status(statusCodes.OK).send({
        data: data,
        success: true,
      });
    } catch (err: any) {
      res.status(statusCodes.BAD_REQUEST).send({
        message: err.message,
        success: false,
      });
    }
  },

  rating: async (req: any, res: any) => {
    try {
      const data = await replyService.rating(req.params.id);
      res.status(statusCodes.OK).send({
        data: data,
        success: true,
      });
    } catch (err: any) {
      res.status(statusCodes.BAD_REQUEST).send({
        message: err.message,
        success: false,
      });
    }
  },

  rate: async (req: any, res: any) => {
    try {
      const replyService = new ReplyService(req.decoded);
      const data = await replyService.rate(req.params.id, req.body);
      res.status(statusCodes.CREATED).send({
        data: data.rating,
        message: `Reply ${data.type}`,
        success: true,
      });
    } catch (err: any) {
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
    }
  },
};

export default replyController;
