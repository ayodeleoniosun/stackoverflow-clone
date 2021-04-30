import AuthService from "../services/auth";
import statusCodes from "../constants/statusCodes";

const authService = new AuthService();

const authController = {
  register: async (req: any, res: any) => {
    try {
      const data = await authService.register(req.body);
      res.status(statusCodes.CREATED).send({
        data: data,
        message: "Registration successful",
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

  login: async (req: any, res: any) => {
    try {
      const data = await authService.login(req.body);
      res.status(statusCodes.OK).send({
        data: data,
        message: "Login successful",
        success: true,
      });
    } catch (err: any) {
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
    }
  },
};

export default authController;
