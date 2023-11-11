import { Input, Button, VStack, useToast } from "@chakra-ui/react";

import FormContainer from "./FormContainer";
import FormElement from "./FormElement";
import FormReminder from "./FormReminder";
import apiClient from "../../services/apiClient";
import useSignup, { signUpData } from "../../hooks/useSignup";
import { Navigate, useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";

const RegisterForm = () => {
  const signUpClient = new apiClient<signUpData>("/users/signup");
  const toast = useToast();
  const redirect = useNavigate();
  const { auth, reset, setAuth, errors, register, handleSubmit } = useSignup();

  if (auth.loggedIn) return <Navigate to="/" />;
  const sendSignupData = (data: signUpData) => {
    signUpClient
      .postData(data)
      .then((res) => {
        toast({
          position: "top-right",
          duration: 1000,
          description: `Welcome ${res.data.user.fullname}`,
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
      <VStack paddingTop={30}>
        <FormContainer title="Sign up to Thullo" submitForm={handleSubmit(sendSignupData)}>
          <FormElement label="Full name:" error={errors.fullname}>
            <Input variant="outline" type="text" placeholder="Example: John doe" {...register("fullname")} />
          </FormElement>
          <FormElement label="Email:" error={errors.email}>
            <Input variant="outline" type="email" placeholder="eg.johndoe@mail.com" {...register("email")} />
          </FormElement>
          <FormElement label="Password:" error={errors.password}>
            <PasswordInput variant="outline" placeholder="Minimum of 6 characters" register={register("password")} />
          </FormElement>
          <FormElement label="Confirm password:" error={errors.confirmPassword}>
            <PasswordInput
              variant="outline"
              placeholder="Confirm your password"
              register={register("confirmPassword")}
            />
          </FormElement>
          <Button type="submit" variant="primary" width="100%" marginTop={15}>
            Sign up
          </Button>
        </FormContainer>
        <FormReminder reminderText="Already have an account ?" callToAction="Sign in" linkToAction="/login" />
      </VStack>
    </>
  );
};

export default RegisterForm;
