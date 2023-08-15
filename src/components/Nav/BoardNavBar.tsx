import { Button } from "@chakra-ui/react";
import VisibilityMenu from "../Menu/VisibilityMenu";
import SectionTitle from "../Panel/SectionTitle";
import { BiSolidUserCircle } from 'react-icons/bi'
import UserInfo from "../UserInfo";

const image = "user-e038abdc-4e2f-4de0-acf3-41d966a2b657-1691675279120.jpeg";

const BoardNavBar = () => {
  return (
    <>
      <VisibilityMenu />
      <Button variant="green">Save</Button>
      <Button variant="outlineRed">Remove</Button>
      <SectionTitle icon={BiSolidUserCircle} title="Made by" />
      <UserInfo creationDate={new Date("2023-08-15T00:10:22.321Z")} image={image} name="Giovanna Bishop"/>
    </>
  );
};

export default BoardNavBar;
