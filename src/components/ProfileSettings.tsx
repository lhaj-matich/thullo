import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Divider,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import ProfileInfo from "./ProfileInfo";
import ProfilePassword from "./ProfilePassword";
import apiClient from "../services/apiClient";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface ModelProps {
  open: boolean;
  onClose: () => void;
}

const ProfileSettings = ({ open, onClose }: ModelProps) => {
  const { setAuth } = useAuth();
  const [disable, setDisabled] = useState(true);
  const toast = useToast({ position: "top-right", duration: 2000 });
  const ProfileAPI = new apiClient("/users");
  const navigate = useNavigate();

  const deleteUser = () => {
    ProfileAPI.deleteData()
      .then(() => {
        toast({
          description: `Account deleted succesfully.`,
          status: "success",
          onCloseComplete() {
            setAuth({ loggedIn: false, token: null, user: null });
            localStorage.removeItem("jwtToken");
            navigate("/login");
          },
        });
      })
      .catch((err) => {
        toast({
          description: err.response?.data?.message || err.message,
          status: "error",
        });
      });
  };

  return (
    <>
      <Modal isOpen={open} onClose={() => {onClose(); setDisabled(true)}} size="xl" variant="primary">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#828282">Profile settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProfileInfo />
          </ModalBody>
          <Divider />
          <ModalHeader color="#828282">Password settings</ModalHeader>
          <ModalBody>
            <ProfilePassword />
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <Checkbox colorScheme="gray" onChange={(e) => setDisabled(!e.target.checked)} color="#828282">
              I want to delete my account
            </Checkbox>
            <Button isDisabled={disable} float="left" variant="outlineRed" onClick={deleteUser}>
              Delete Account
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileSettings;
