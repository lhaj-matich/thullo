import z from "zod";
import { Button, Box, Center, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { updatePasswordSchema } from "../../utils/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import apiClient from "../../services/apiClient";
import FormElement from "./FormElement";
import PasswordInput from "./PasswordInput";

type updatePasswordData = z.infer<typeof updatePasswordSchema>;

const ProfilePassword = () => {
  const toast = useToast({ position: "top-right", duration: 1000 });
  const ProfileAPI = new apiClient("/users/updatePassword");
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<updatePasswordData>({ resolver: zodResolver(updatePasswordSchema) });

  const sendUpdateData = (data: updatePasswordData) => {
    ProfileAPI.updateData(data, {})
      .then(() => {
        toast({
          description: `Password updated succesfully.`,
          status: "success",
        });
      })
      .catch((err) => {
        toast({
          description: err.response?.data?.message || err.message,
          status: "error",
        });
      });
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(sendUpdateData)}>
        <Center>
          <Box paddingX={10} paddingBottom={5} width="360px">
            <FormElement label="Current Password:" error={errors.password}>
              <PasswordInput placeholder="Password" variant="outline" register={register("password")} />
            </FormElement>
            <FormElement label="New Password:" error={errors.newPassword}>
              <PasswordInput placeholder="Atleast 3 characters" variant="outline" register={register("newPassword")} />
            </FormElement>
            <FormElement label="Confirm Password:" error={errors.confirmPassword}>
              <PasswordInput
                placeholder="Confirm new password"
                variant="outline"
                register={register("confirmPassword")}
              />
            </FormElement>
          </Box>
        </Center>
        <Center>
          <Button type="submit" marginTop={2} fontWeight="400">
            Submit
          </Button>
        </Center>
      </form>
    </>
  );
};

export default ProfilePassword;
