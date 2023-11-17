import { Input, Button, VStack, useToast, Link, Box } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import useLogin, { loginData } from "../../hooks/useLogin";
import FormContainer from "./FormContainer";
import FormElement from "./FormElement";
import FormReminder from "./FormReminder";
import PasswordInput from "./PasswordInput";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const LoginForm = () => {
  const loginClient = new apiClient<loginData>("/users/login");
  const toast = useToast();
  const redirect = useNavigate();
  const { auth, setAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const { reset, errors, register, handleSubmit } = useLogin();

  if (auth.loggedIn) return <Navigate to="/" />;
  const sendLoginData = (data: loginData) => {
    setLoading(true);
    loginClient
      .postData(data)
      .then((res) => {
        setLoading(false);
        toast({
          position: "top-right",
          duration: 1000,
          description: `Welcome back ${res.data.user.fullname}`,
          status: "success",
          onCloseComplete() {
            redirect("/");
            localStorage.setItem("user", JSON.stringify(res.data.user))
            setAuth({ loggedIn: true, user: res.data.user });
          },
        });
      })
      .catch((err) => {
        setLoading(false);
        toast({ position: "top-right", description: err.response?.data?.message || err.message, status: "error" });
      });
    reset();
  };
  return (
    <>
      <VStack paddingTop={75}>
        <FormContainer title="Sign in to Thullo" submitForm={handleSubmit(sendLoginData)}>
          <FormElement label="Email:" error={errors.email}>
            <Input variant="outline" type="email" placeholder="eg.johndoe@mail.com" {...register("email")} />
          </FormElement>
          <FormElement label="Password:" error={errors.password}>
            <PasswordInput variant="outline" placeholder="Minimum of 6 characters." register={register("password")} />
            <Box width="100%">
              <Link href="/forgotpassword" float="right" color="primary">Forgot password ?</Link>
            </Box>
          </FormElement>
          <Button type="submit" variant="primary" width="100%" isLoading={loading}>
            Sign in
          </Button>
        </FormContainer>
        <FormReminder reminderText="First time here ?" callToAction="Create an account" linkToAction="/signup" />
      </VStack>
    </>
  );
};

export default LoginForm;
