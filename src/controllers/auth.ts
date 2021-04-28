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

  login: (req, res) => {
    Promise.try(() => authService.login(req.body))
      .then((data) => {
        res.status(statusCodes.OK).send({
          data: data,
          message: "Login successful",
          success: true,
        });
      })
      .catch((err) => {
        let statusCode: number;

        if (err.type == "RESOURCE_NOT_FOUND") {
          statusCode = statusCodes.NOT_FOUND;
        } else if (err.type == "PERMISSION_DENIED_TO_RESOURCE") {
          statusCode = statusCodes.FORBIDDEN;
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

export default authController;
