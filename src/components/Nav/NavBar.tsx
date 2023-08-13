import { Divider, HStack } from "@chakra-ui/react";
import Logo from "../Logo";
import BoardSearch from "../BoardSearch";
import ProfileMenu from "../Menu/ProfileMenu";
import { ReactNode } from "react";

interface NavbarProps {
  children?: ReactNode;
}

const NavBar = ({ children }: NavbarProps) => {
  return (
    <>
      <HStack padding={3} justifyContent="space-between" background="#fff">
        <HStack>
          <Logo />
          <HStack>{children}</HStack>
        </HStack>
        <HStack>
          <BoardSearch />
          <ProfileMenu />
        </HStack>
      </HStack>
      <Divider />
    </>
  );
};

export default NavBar;
