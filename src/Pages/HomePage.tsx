import { Center, VStack} from "@chakra-ui/react";

import useAuth from "../hooks/useAuth";
import NavBar from "../components/Nav/NavBar";
import BoardsContainer from "../components/Container/BoardsContainer";

const HomePage = () => {
  const { auth } = useAuth();
  return (
    <>
      <NavBar />
      <Center paddingTop={5}>
        <VStack>
          <BoardsContainer />
        </VStack>
      </Center>
    </>
  );
};

export default HomePage;
