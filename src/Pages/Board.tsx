import { Center, VStack} from "@chakra-ui/react";
import NavBar from "../components/Nav/NavBar";
import BoardNavBar from "../components/Nav/BoardNavBar";
import BoardHeader from "../components/Nav/BoardHeader";
import EditDescription from "../components/Panel/EditDescription";

const Board = () => {
  return (
    <>
      <NavBar>
        <BoardHeader name="The amazing board" />
      </NavBar>
      <BoardNavBar />
      <Center paddingTop={5}>
        <VStack>
        </VStack>
      </Center>
    </>
  );
};

export default Board;
