import { Input, Button, VStack, useToast } from "@chakra-ui/react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import apiClient from "../../services/apiClient";
import useLogin, { loginData } from "../../hooks/useLogin";
import FormContainer from "./FormContainer";
import FormElement from "./FormElement";
import FormReminder from "./FormReminder";
import PasswordInput from "./PasswordInput";
import useAuth from "../../hooks/useAuth";

const LoginForm = () => {
  const loginClient = new apiClient<loginData>("/users/login");
  const toast = useToast();
  const redirect = useNavigate();
  const { auth, setAuth } = useAuth();
  const { reset, errors, register, handleSubmit } = useLogin();

  if (auth.loggedIn) return <Navigate to="/" />;
  const sendLoginData = (data: loginData) => {
    loginClient
      .postData(data)
      .then((res) => {
        toast({
          position: "top-right",
          duration: 1000,
          description: `Welcome back ${res.data.user.fullname}`,
          status: "success",
          onCloseComplete() {
            redirect("/");
            localStorage.setItem("jwtToken", res.data.token);
            setAuth({ loggedIn: true, token: res.data.token, user: res.data.user });
          },
        });
      })
      .catch((err) => {
        toast({ position: "top-right", description: err.response?.data?.message || err.message, status: "error" });
      });
    reset();
  };
  return (
    <>
      <VStack paddingTop={55}>
        <FormContainer title="Sign in to Thullo" submitForm={handleSubmit(sendLoginData)}>
          <FormElement label="Email:" error={errors.email}>
            <Input variant="outline" type="email" placeholder="eg.johndoe@mail.com" {...register("email")} />
          </FormElement>
          <FormElement label="Password:" error={errors.password}>
            <PasswordInput variant="outline" placeholder="Minimum of 6 characters." register={register("password")} />
            <Link to="/forgotpassword" className="link link--right">
              Forgot password ?
            </Link>
          </FormElement>
          <Button type="submit" variant="primary" width="100%">
            Sign in
          </Button>
        </FormContainer>
        <FormReminder reminderText="First time here ?" callToAction="Create an account" linkToAction="/signup" />
      </VStack>
    </>
  );
};

export default LoginForm;
