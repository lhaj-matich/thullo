import { AiFillCaretDown } from "react-icons/ai";
import { Menu, MenuButton, MenuList, MenuItem, HStack, Heading, Avatar, Button, Badge } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import apiClient from "../../services/apiClient";
import useGlobal from "../../hooks/useGlobal";

import { InviteResponse } from "../List/ReceivedInvitesList";

const ProfileMenu = () => {
  const { inviteModal, profileModal, invites } = useGlobal();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const usersClient = new apiClient("/users/logout");
  const invitesClient = new apiClient<InviteResponse>("/invites");

  const handleLogout = () => {
    usersClient.postData({}).then(() => {
      setAuth({ loggedIn: false, token: null, user: null });
      localStorage.removeItem("jwtToken");
      navigate("/login");
    });
  };

  const handleRefetch = () => {
    invitesClient.getData().then((res) => invites.setInvitesNumber(res.data.count));
  };

  return (
    <Menu variant="primary">
      <MenuButton variant="menuButton" as={Button} rightIcon={<AiFillCaretDown />} onClick={handleRefetch}>
        <HStack>
          <Avatar
            height={9}
            width={9}
            borderRadius={9}
            bg="#BDBDBD"
            name={auth.user?.fullname}
            src={"http://localhost:5002/img/users/" + auth.user?.profileImage}
          />
          <Heading fontFamily="Poppins" fontSize={14}>
            {auth.user?.fullname}
          </Heading>
        </HStack>
      </MenuButton>
      <MenuList fontFamily="Poppins">
        <MenuItem onClick={profileModal.onOpen}>Profile settings</MenuItem>
        <MenuItem justifyContent="space-between" onClick={inviteModal.onOpen}>
          Invites{" "}
          {invites.invitesNumber ? (
            <Badge width="25px" textAlign="center" borderRadius={15} colorScheme="red">
              {invites.invitesNumber}
            </Badge>
          ) : (
            ""
          )}
        </MenuItem>
        <MenuItem onClick={() => navigate("/")}>Boards</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
