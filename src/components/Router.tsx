import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetForm from "./ResetForm";
import Board from "../Pages/Board";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Board />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/signup",
    element: <RegisterForm />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPasswordForm />,
  },
  {
    path: "/resetpassword/:token",
    element: <ResetForm />,
  },
]);

export default router;
