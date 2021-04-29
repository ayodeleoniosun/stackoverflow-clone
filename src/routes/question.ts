import express from "express";
import questionController from "../controllers/question";
import permissions from "../middlewares/permissions";

const questionRouter = express.Router();

questionRouter.route("/").get(questionController.index);

questionRouter
  .route("/")
  .post(permissions.isAuthenticated, questionController.post);

questionRouter
  .route("/:id/reply")
  .post(permissions.isAuthenticated, questionController.reply);

export default questionRouter;
