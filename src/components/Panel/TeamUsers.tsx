import { Box, HStack, Text, Button } from "@chakra-ui/react";
import UserInfo from "../UserInfo";
import SectionTitle from "./SectionTitle";
import { RiTeamFill } from "react-icons/ri";

const userPhoto = "user-e038abdc-4e2f-4de0-acf3-41d966a2b657-1691675279120.jpeg";

const TeamUsers = () => {
  return (
    <Box>
      <SectionTitle title="Team" icon={RiTeamFill} />
      <HStack justifyContent="space-between" marginY={3}>
        <UserInfo name="Gheroge Watts" image={userPhoto} />
        <Text textAlign="center" variant="generic" fontSize="14px" color="#828282" width="100px">
          Admin
        </Text>
      </HStack>
      <HStack justifyContent="space-between" marginY={3}>
        <UserInfo name="Gheroge Watts" image={userPhoto} />
        <Button variant="outlineRed">Remove</Button>
      </HStack>
      <HStack justifyContent="space-between" marginY={3}>
        <UserInfo name="Gheroge Watts" image={userPhoto} />
        <Button variant="outlineRed">Remove</Button>
      </HStack>
    </Box>
  );
};

export default TeamUsers;
