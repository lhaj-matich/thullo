import express from "express";
import * as commentsController from "../controllers/commentsController";
import { authorizeRoute, preventUnauthorized } from "../controllers/authController";

const Router = express.Router({ mergeParams: true });

Router.use(authorizeRoute);

Router.use(preventUnauthorized("user"));

Router.route("/").get(commentsController.getAllComments).post(commentsController.createComment);

Router.route("/:id")
  .put(commentsController.updateCommentById)
  .delete(commentsController.deleteCommentById);

export default Router;
