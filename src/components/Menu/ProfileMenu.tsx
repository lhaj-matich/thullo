import { AiFillCaretDown } from "react-icons/ai";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Heading,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import apiClient from "../../services/apiClient";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const usersClient = new apiClient("/users/logout");

  const handleLogout = () => {
    usersClient.postData({}).then(() => {
      setAuth({ loggedIn: false, token: null, user: null });
      localStorage.removeItem("jwtToken");
      navigate("/login");
    });
  };

  return (
    <Menu variant="primary">
      <MenuButton
        variant="menuButton"
        as={Button}
        rightIcon={<AiFillCaretDown />}
      >
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
        <MenuItem onClick={() => console.log("Hello")}>Profile</MenuItem>
        <MenuItem onClick={() => console.log("Hello")}>Invites</MenuItem>
        <MenuItem onClick={() => navigate("/")}>Boards</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
