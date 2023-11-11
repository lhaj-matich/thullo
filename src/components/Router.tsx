import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import LoginForm from "./Form/LoginForm";
import RegisterForm from "./Form/RegisterForm";
import ForgotPasswordForm from "./Form/ForgotPasswordForm";
import ResetForm from "./Form/ResetForm";
import BoardPage from "../Pages/Board";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/board/:id",
    element: <BoardPage />,
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
