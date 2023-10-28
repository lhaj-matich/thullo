import express from "express";
import * as cardsController from "../controllers/cardsController";
import * as authController from "../controllers/authController";

import tasksRouter from "./tasksRouter";
import labelsRouter from "./labelsRouter";
import commentsRouter from "./commentsRouter";
import attachementsRouter from "./attachementsRouter";

const Router = express.Router({ mergeParams: true });

Router.use(authController.authorizeRoute);

Router.use("/:cardId/tasks", tasksRouter);
Router.use("/:cardId/labels", labelsRouter);
Router.use("/:cardId/comments", commentsRouter);
Router.use("/:cardId/attachements", attachementsRouter);

Router.route("/").get(cardsController.getAllCards).post(cardsController.createCard);

Router.route("/:id")
  .get(cardsController.getCardById)
  .put(cardsController.updateCardById)
  .delete(cardsController.deleteCardById);

export default Router;
