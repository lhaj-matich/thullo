import { Center, Heading, VStack} from "@chakra-ui/react";

import useAuth from "../hooks/useAuth";
import NavBar from "./Nav/NavBar";
import BoardHeader from "./Nav/BoardHeader";
import PhotoSearch from "./Modal/PhotoSearch";
import NewBoard from "./Modal/NewBoard";

// const NavBar = () => {
//   const navigate = useNavigate();
//   const profileModal = useDisclosure();

//   return (
//     <Box padding={4} backgroundColor="#fff">
//       <HStack justify="space-between">
//         <HStack>
//           <Logo />
//           <BoardSearch />
//           <Button onClick={profileModal.onOpen}>Profile</Button>
//           <Invites />
//           <AssignMember />
//         </HStack>
//       </HStack>
//       <ProfileSettings open={profileModal.isOpen} onClose={profileModal.onClose} />
//     </Box>
//   );
// };

const HomePage = () => {
  const { auth } = useAuth();
  return (
    <>
      <NavBar>
        <BoardHeader name="DevChallenges Board" />
      </NavBar>
      <Center paddingTop={5}>
        <VStack>
          <Heading as="h1">
            HomePage: {auth.loggedIn ? "Logged in" : "You need to login"}
          </Heading>
          <NewBoard />
        </VStack>
      </Center>
      <PhotoSearch />
    </>
  );
};

export default HomePage;
