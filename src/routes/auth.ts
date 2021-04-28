import express from "express";
import authController from "../controllers/auth";

const authRouter = express.Router();

authRouter.route("/register").post(authController.register);

export default authRouter;
