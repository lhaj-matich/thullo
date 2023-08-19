import { Box, Button, HStack } from "@chakra-ui/react";
import VisibilityMenu from "../Menu/VisibilityMenu";
import SectionTitle from "../Panel/SectionTitle";
import { BiSolidUserCircle } from "react-icons/bi";
import UserInfo from "../UserInfo";
import UserGroupList from "../List/UserGroupList";
import { Board, User } from "../BoardSearch";
import AssignMember from "../AssignMember";
import GenericButton from "../Button/GenericButton";
import { BsThreeDots } from 'react-icons/bs'

const user: User = {
  id: "e038abdc-4e2f-4de0-acf3-41d966a2b657",
  fullname: "Giovanna Bishop",
  email: "Giovanna71@hotmail.com",
  profileImage: "user-e038abdc-4e2f-4de0-acf3-41d966a2b657-1691675279120.jpeg",
};

const board: Board = {
  id: "436f167e-bcaf-4752-a073-e275d2fbe2dc",
  title: "Programming Language",
  coverImage: "dMUt0X3f59Q",
  description: "",
  visibility: true,
  authorId: "e038abdc-4e2f-4de0-acf3-41d966a2b657",
  createdAt: "2023-08-15T00:10:22.321Z",
  updatedAt: "2023-08-15T00:10:22.321Z",
  author: user,
};

const BoardNavBar = () => {
  return (
    <HStack padding={6} backgroundColor="#fff" justifyContent="space-between">
      <HStack>
        <VisibilityMenu />
        <UserGroupList marginX={3} max={5} users={[...(board?.author ? [board.author] : [])]} />
        <AssignMember />
      </HStack>
      <GenericButton text="Show Menu" icon={BsThreeDots} />

      {/* <Button variant="green">Save</Button>
      <Button variant="outlineRed">Remove</Button>
      <SectionTitle icon={BiSolidUserCircle} title="Made by" />
      <UserInfo creationDate={new Date("2023-08-15T00:10:22.321Z")} image={image} name="Giovanna Bishop"/> */}
    </HStack>
  );
};

export default BoardNavBar;
