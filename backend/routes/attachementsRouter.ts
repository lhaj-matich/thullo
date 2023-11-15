import express from "express";
import * as attachementsCtrl from "../controllers/attachementsController";
import * as authCtrl from "../controllers/authController";

const Router = express.Router({ mergeParams: true });

Router.use(authCtrl.authorizeRoute);

Router.use(authCtrl.preventUnauthorized("user"));

Router.route("/")
  .get(attachementsCtrl.getAllAttachements)
  .post(
    attachementsCtrl.uploadCardAttachement,
    process.env.ASSETS === "local" ? attachementsCtrl.processAttachement : attachementsCtrl.FirebaseUploadAttachements,
    attachementsCtrl.createAttachement
  );

Router.route("/:id").get(attachementsCtrl.getAttachementById).delete(attachementsCtrl.deleteAttachementById);

export default Router;
