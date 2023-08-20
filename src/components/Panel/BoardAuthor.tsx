import { Box } from "@chakra-ui/react";
import { BiSolidUserCircle } from "react-icons/bi";

import SectionTitle from "../Panel/SectionTitle";
import UserInfo from "../UserInfo";

const BoardAuthor = () => {
  return (
    <Box marginBottom={5}>
      <SectionTitle title="Made by" icon={BiSolidUserCircle} />
      <UserInfo creationDate={new Date("2023-08-15T00:10:22.321Z")} image="" name="Giovanna Bishop" />
    </Box>
  );
};

export default BoardAuthor;
