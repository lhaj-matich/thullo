import { Input, Button, VStack, useToast } from "@chakra-ui/react";

import FormContainer from "./FormContainer";
import FormElement from "./FormElement";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useForgotPassword, { forgotPasswordData } from "../../hooks/useForgotPassword";
import apiClient from "../../services/apiClient";

const ForgotPasswordForm = () => {
  const loginClient = new apiClient<forgotPasswordData>("/users/forgotPassword");
  const toast = useToast();
  const redirect = useNavigate();
  const { auth } = useAuth();
  const { reset, errors, register, handleSubmit } = useForgotPassword();

  if (auth.loggedIn) return <Navigate to="/" />;
  const sendForgotPasswordData = (data: forgotPasswordData) => {
    loginClient
      .postData(data)
      .then((res) => {
        toast({
          position: "top-right",
          duration: 2000,
          description: `${res.data.message}`,
          status: "success",
          onCloseComplete() {
            redirect("/login");
          },
        });
      })
      .catch((err) => {
        toast({ position: "top-right", description: err.response?.data?.message || err.message, status: "error" });
      });
    reset();
  };
  return (
    <VStack paddingTop={30}>
      <FormContainer title="Thullo reset password" submitForm={handleSubmit(sendForgotPasswordData)}>
        <FormElement label="Email:" error={errors.email}>
          <Input variant="outline" type="email" placeholder="eg.johndoe@mail.com" {...register("email")} />
        </FormElement>
        <Button type="submit" variant="primary" width="100%" paddingY={3} marginTop={3}>
          Reset password
        </Button>
      </FormContainer>
    </VStack>
  );
};

export default ForgotPasswordForm;
