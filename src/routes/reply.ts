import express from "express";
import replyController from "../controllers/reply";

const replyRouter = express.Router();

replyRouter.route("/:id").get(replyController.show);

export default replyRouter;
