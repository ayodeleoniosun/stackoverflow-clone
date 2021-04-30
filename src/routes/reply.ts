import express from "express";
import replyController from "../controllers/reply";
import permissions from "../middlewares/permissions";

const replyRouter = express.Router();

replyRouter.route("/:id").get(replyController.show);

replyRouter.route("/:id/rating").get(replyController.rating);

replyRouter
  .route("/:id/rate")
  .post(permissions.isAuthenticated, replyController.rate);

export default replyRouter;
