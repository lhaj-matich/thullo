import express from "express";
import cardsRouter from './cardsRouter';
import * as listsController from "../controllers/listsController";
import { authorizeRoute, preventUnauthorized } from "../controllers/authController";

const Router = express.Router({mergeParams: true});

Router.use(authorizeRoute);

Router.use(preventUnauthorized("user"));

Router.use("/:listId/cards", cardsRouter);

Router.route("/").get(listsController.getAllLists).post(listsController.createList);

Router.route("/:id")
  .get(listsController.getListById)
  .delete(listsController.deleteListById)
  .put(listsController.updateListById);

export default Router;
