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
};

export default replyController;
