import { Promise } from "bluebird";
import AuthService from "../services/auth";
import statusCodes from "../constants/statusCodes";

const authService = new AuthService();

const authController = {
  register: (req, res) => {
    Promise.try(() => authService.register(req.body))
      .then((data) => {
        res.status(statusCodes.CREATED).send({
          data: data,
          message: "Registration successful",
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

export default authController;
