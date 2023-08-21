import { Button, VStack, useToast } from "@chakra-ui/react";

import FormContainer from "./FormContainer";
import FormElement from "./FormElement";
import PasswordInput from "./PasswordInput";
import apiClient from "../services/apiClient";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useResetPassword, { resetPasswordData } from "../hooks/useResetPassword";

const ResetForm = () => {
  const { token } = useParams();
  const { auth } = useAuth();
  const { reset, errors, register, handleSubmit } = useResetPassword();
  const passwordResetClient = new apiClient<resetPasswordData>(`/users/resetPassword/${token}`);
  const toast = useToast();
  const redirect = useNavigate();

  if (auth.loggedIn) return <Navigate to="/" />;
  const sendResetData = (data: resetPasswordData) => {
    passwordResetClient
      .postData(data)
      .then((res) => {
        toast({
          position: "top-right",
          duration: 1000,
          description: res.data.message,
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
    <>
      <VStack paddingTop={30}>
        <FormContainer title="Thullo reset password" submitForm={handleSubmit(sendResetData)}>
          <FormElement label="Password:" error={errors.newPassword}>
            <PasswordInput variant="outline" placeholder="At least 6 characters long" register={register("newPassword")} />
          </FormElement>
          <FormElement label="Confirm Password:" error={errors.confirmPassword}>
            <PasswordInput
              variant="outline"
              placeholder="Confirm your password"
              register={register("confirmPassword")}
            />
          </FormElement>
          <Button type="submit" variant="primary" width="100%" marginTop={3}>
            Reset password
          </Button>
        </FormContainer>
      </VStack>
    </>
  );
};

export default ResetForm;
