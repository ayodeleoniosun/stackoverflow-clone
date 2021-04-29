import { decodeJWTToken } from "../helpers/tools";
import statusCodes from "../constants/statusCodes";

const permissions = {
  isAuthenticated: async (req, res, next) => {
    try {
      const user = decodeJWTToken(req.headers.authorization);

      if (user) {
        req.decoded = user;
        next();
      } else {
        res.status(statusCodes.UNAUTHORIZED).send({
          data: null,
          message: "Please login to your account.",
          success: false,
        });
      }
    } catch (error) {
      res.status(statusCodes.UNAUTHORIZED).send({
        data: null,
        message: "Please login to your account.",
        success: false,
      });
    }
  },
};

export default permissions;
