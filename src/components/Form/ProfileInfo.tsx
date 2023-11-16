import z from "zod";
import { Button, Box, Center, Input, HStack, useToast } from "@chakra-ui/react";
import ProfileImage from "./ProfileImage";
import FormElement from "./FormElement";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { profileSchema } from "../../utils/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "../../services/apiClient";
import { useState } from "react";

type ProfileData = z.infer<typeof profileSchema>;

const ProfileInfo = () => {
  const ProfileAPI = new apiClient("/users");
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuth();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<ProfileData>({ resolver: zodResolver(profileSchema) });

  const SendFormData = (data: ProfileData) => {
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("profileImage", data.profileImage[0]);
    setLoading(true);
    ProfileAPI.updateData(formData, { "Content-Type": "multipart/form-data" })
      .then((res) => {
        setAuth({ ...auth, user: res.data.user });
        toast({
          position: "top-right",
          duration: 1000,
          description: `Profile updated succesfully.`,
          status: "success",
        });
        setLoading(false);
      })
      .catch(() => {
        toast({
          position: "top-right",
          duration: 1000,
          description: `Error updating profile.`,
          status: "error",
        });
        setLoading(false);
      });
  };

  return (
    <>
      <form encType="multipart/form-data" onSubmit={handleSubmit(SendFormData)}>
        <Center alignItems="center">
          <HStack alignItems="center">
            <ProfileImage userImage={auth.user?.profileImage} register={register("profileImage")} />
            <Box paddingX={10} paddingBottom={5}>
              <FormElement label="Name:" error={errors.fullname}>
                <Input
                  variant="outline"
                  type="name"
                  placeholder="eg.John Doe"
                  width="300px"
                  defaultValue={auth.user?.fullname}
                  {...register("fullname")}
                />
              </FormElement>
              <FormElement label="Email:" error={errors.email}>
                <Input
                  variant="outline"
                  type="email"
                  placeholder="eg.johndoe@mail.com"
                  width="300px"
                  defaultValue={auth.user?.email}
                  {...register("email")}
                />
              </FormElement>
            </Box>
          </HStack>
        </Center>
        <Button isDisabled={loading} type="submit" fontWeight="400" float="right" marginBottom={5}>
          {loading ? "Updating..." : "Update profile"}
        </Button>
      </form>
    </>
  );
};

export default ProfileInfo;
