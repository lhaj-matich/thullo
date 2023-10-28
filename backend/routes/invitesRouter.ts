import express from "express";
import * as invitesController from "../controllers/invitesController";
import { authorizeRoute } from "../controllers/authController";

const Router = express.Router({ mergeParams: true });

Router.use(authorizeRoute);

Router.route("/accept").post(invitesController.acceptInvite);

Router.route("/sent").get(invitesController.getSentInvites);

Router.route("/").get(invitesController.getAllInvites).post(invitesController.createInvite);

Router.route("/:id").get(invitesController.getInviteById).delete(invitesController.deleteInviteById);

export default Router;
