import { Promise } from "bluebird";
import AuthService from "../services/auth";
import statusCodes from "../constants/statusCodes";

const authService = new AuthService();

const authController = {
  register: (req, res) => {
    Promise.try(() => authService.register(req.body))
      .then((data) => {
        res.status(statusCodes.OK).send({
          data: data,
          message: "Registration successful",
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(statusCodes.BAD_REQUEST).send({
          message: err.message,
          success: false,
        });
      });
  },
};

export default authController;
