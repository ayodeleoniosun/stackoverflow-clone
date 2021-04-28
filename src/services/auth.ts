import { User, UserAddModel, UserAttributes } from "../../db/models/users";
import customErrorCodes from "../constants/customErrorCodes";
import { CustomError } from "../helpers/errors";

require("dotenv").config();

export class AuthService {
  async register(credentials: UserAddModel) {
    const { display_name, email } = credentials;

    const display_name_exists = await this.getUser({
      display_name: display_name,
    });

    const email_exists = await this.getUser({ email: email });

    if (display_name_exists)
      throw new CustomError(
        customErrorCodes.RESOURCE_ALREADY_EXIST,
        "Display name already exists"
      );
    else if (email_exists)
      throw new CustomError(
        customErrorCodes.RESOURCE_ALREADY_EXIST,
        "Email address already exists"
      );

    return User.create(credentials).then((user) =>
      this.getUser({ id: user.id })
    );
  }

  async getUser(column: object) {
    return await User.findOne({
      attributes: UserAttributes,
      where: column,
    });
  }
}

export default AuthService;
