import {
  User,
  UserRegisterModel,
  UserLoginModel,
  UserAttributes,
} from "../db/models/user";
import customErrorCodes from "../constants/customErrorCodes";
import { CustomError } from "../helpers/errors";
import { generateJWTToken } from "../helpers/tools";
import bcrypt from "bcrypt";

require("dotenv").config();
export class AuthService {
  async register(payload: UserRegisterModel) {
    const { display_name, email } = payload;

    const displayNameExists = await this.getUser({
      display_name: display_name,
    });

    const emailExists = await this.getUser({ email: email });

    if (displayNameExists)
      throw new CustomError(
        "Display name already exists",
        customErrorCodes.RESOURCE_ALREADY_EXIST
      );
    else if (emailExists)
      throw new CustomError(
        "Email address already exists",
        customErrorCodes.RESOURCE_ALREADY_EXIST
      );

    return User.create(payload).then((user) => this.getUser({ id: user.id }));
  }

  async login(payload: UserLoginModel) {
    const { email, password } = payload;
    const user = await this.getUser({ email: email }, true);

    if (!user)
      throw new CustomError(
        "Email does not exist. Kindly register",
        customErrorCodes.RESOURCE_NOT_FOUND
      );

    return bcrypt.compare(password, user.password).then(async (response) => {
      if (response)
        return {
          token: generateJWTToken(user.toJSON()),
          user: user,
        };

      throw new CustomError(
        "Incorrect login credentials.",
        customErrorCodes.PERMISSION_DENIED_TO_RESOURCE
      );
    });
  }

  async getUser(column: object, password: boolean = false) {
    if (password) UserAttributes.push("password");

    return await User.findOne({
      attributes: UserAttributes,
      where: column,
    });
  }
}

export default AuthService;
