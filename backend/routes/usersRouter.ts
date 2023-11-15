import express from "express";
import * as usersController from "../controllers/usersController";
import * as authController from "../controllers/authController";
import boardsRouter from "./boardsRouter";

const Router = express.Router();

Router.use("/:userId/boards", boardsRouter);

Router.route("/signup").post(authController.signup);
Router.route("/login").post(authController.login);
Router.route("/resetPassword/:token").post(authController.resetPassword);
Router.route("/forgotPassword").post(authController.forgotPassword);

Router.use(authController.authorizeRoute);

Router.route("/me").get(authController.isLoggedIn);
Router.route("/updatePassword").put(authController.updatePassword);
Router.route("/logout").post(authController.logout);

Router.route("/")
  .get(usersController.getAllUsers)
  .put(
    usersController.uploadUserPhoto,
    process.env.ASSETS === "local" ? usersController.processUserPhoto : usersController.FirebaseUploadUsers,
    usersController.updateCurrentUser
  )
  .delete(usersController.deleteCurrentUser);
Router.route("/:id").get(usersController.getUserById);

export default Router;
