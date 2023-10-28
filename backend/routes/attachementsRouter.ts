import express from "express";
import * as attachementsCtrl from "../controllers/attachementsController";
import * as authCtrl from "../controllers/authController";

const Router = express.Router({ mergeParams: true });

Router.use(authCtrl.authorizeRoute);

Router.route("/").get(attachementsCtrl.getAllAttachements).post(attachementsCtrl.uploadCardAttachement, attachementsCtrl.processAttachement,attachementsCtrl.createAttachement);

Router.route("/:id").get(attachementsCtrl.getAttachementById).delete(attachementsCtrl.deleteAttachementById);

export default Router;
