import { decodeJWTToken } from "../helpers/tools";
import statusCodes from "../constants/statusCodes";
import { User } from "../db/models/user";

const permissions = {
  isAuthenticated: async (req, res, next) => {
    try {
      const user: any = decodeJWTToken(req.headers.authorization);
      const isActiveUser = await User.findByPk(user.id);

      if (user && isActiveUser) {
        req.decoded = user;
        next();
      } else {
        res.status(statusCodes.UNAUTHORIZED).send({
          message: "Please login to your account.",
          success: false,
        });
      }
    } catch (error) {
      res.status(statusCodes.UNAUTHORIZED).send({
        message: "Please login to your account.",
        success: false,
      });
    }
  },
};

export default permissions;
