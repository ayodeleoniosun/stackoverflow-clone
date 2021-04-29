import express from "express";
import questionController from "../controllers/question";
import permissions from "../middlewares/permissions";

const questionRouter = express.Router();

questionRouter
  .route("/")
  .post(permissions.isAuthenticated, questionController.post);

export default questionRouter;
