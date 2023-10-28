import express from "express";
import * as labelsController from "../controllers/labelsController";
import { authorizeRoute, preventUnauthorized } from "../controllers/authController";

const Router = express.Router({ mergeParams: true });

Router.use(authorizeRoute);

Router.use(preventUnauthorized("user"));

Router.route("/").get(labelsController.getAllLabels).post(labelsController.createLabel);

Router.route("/:id").delete(labelsController.deleteLabelById);

export default Router;
